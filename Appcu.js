/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

export default class HelloWorldApp extends Component {
  state = {
    currentTime: 0.0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.3gpp',
    hasPermission: undefined,
  };

  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 16000,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "amr_wb",
      OutputFormat: 'mpeg_4',
      AudioEncodingBitRate: 32000
    });
  }

  componentDidMount() {
    AudioRecorder.requestAuthorization().then((isAuthorised) => {
      this.setState({ hasPermission: isAuthorised });

      if (!isAuthorised) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
        }
      };
    });
  }

  async _pause() {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!');
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({paused: true});
    } catch (error) {
      console.error(error);
    }
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn('Can\'t resume, not paused!');
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({paused: false});
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({stoppedRecording: true, recording: false, paused: false});

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if(this.state.stoppedRecording){
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({recording: true, paused: false});

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath, fileSize) {
    this.setState({ finished: didSucceed });
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
  }

  render() {
    return (
      <View style={{ backgroundColor: "black", flex: 1 }}>
      <View style={{ backgroundColor: "gray", flex: 1}}>
          <View style={{height: 200, backgroundColor: "lightgray", margin: 10, borderRadius: 10, padding: 20, marginTop: 20}}>
              <TextInput
                style={{flex: 1,  backgroundColor: "white", padding: 20}}
                multiline={true}
                ref={input => this.mytextinput = input}
                placeholder={"Gõ chữ tiếng việt vô đây rồi bấm nút ở dưới nhá!"}
                placeholderStyle={{ fontFamily: "Roboto", borderColor: 'whitesmoke', margin: 15}}
                placeholderTextColor={'steelblue'}
                //onChangeText={(text) => this.setState({text})}
                //value={this.state.text}
              />
          </View>
          <View style={{height: 100, backgroundColor: "gray", alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity onPress={()=>{this.mytextinput.blur(); this._play();}}>
              <Text style={{ fontFamily: "Roboto", fontSize: 25, color: "white" }}>
                 SPEAK ALOUD TEXT HERE
              </Text>
            </TouchableOpacity>
          </View>
      </View>
      <View style={{ backgroundColor: "steelblue", flex: 1 }}>
        <View style={{ flexDirection: "row", height: 100,alignItems: "center", justifyContent: "center", padding: 10}}>
          
            <TouchableOpacity style={{marginHorizontal: 30}} onPress={()=>{this._record();}}>
              <Text style={{fontFamily: "Roboto", fontSize: 25, color: "white"}}>
                  RECORD
              </Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={{marginHorizontal: 30}} onPress={()=>{this._stop();}}>
              <Text style={{fontFamily: "Roboto", fontSize: 25, color: "white"}}>
                  ANALYZE
              </Text>
            </TouchableOpacity>
         
        </View>

        <View style={{height: 50, alignItems: "center", justifyContent: "center"}}>
          <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "white" }}>
              ELAPSED: {this.state.currentTime}
          </Text>
        </View>

        <View style={{padding: 10, height: 150, marginTop: 20}}>
          <View style={{ borderRadius: 10, backgroundColor:"lightblue", flex: 1, padding: 20}}>
                <Text style={{fontFamily: "monospace", color: "gray"}}>
                   Tôi đang tự hỏi
                </Text>
          </View>
        </View>
      </View>
      
    </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

