/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <View style={{ backgroundColor: "gray", flex: 1}}>
          <View style={{height: 200, backgroundColor: "lightgray", margin: 10, borderRadius: 10, padding: 20, marginTop: 20}}>
              <TextInput
                style={{flex: 1,  backgroundColor: "white"}}
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
            <TouchableOpacity onPress={()=>{this.mytextinput.blur()}}>
              <Text style={{ fontFamily: "Roboto", fontSize: 25, color: "white" }}>
                 SPEAK ALOUD TEXT HERE
              </Text>
            </TouchableOpacity>
          </View>
      </View>
      <View style={{ backgroundColor: "steelblue", flex: 1 }}>
        <View style={{ flexDirection: "row", height: 100,alignItems: "center", justifyContent: "center", padding: 10}}>
          
            <TouchableOpacity style={{marginHorizontal: 30}}>
              <Text style={{fontFamily: "Roboto", fontSize: 25, color: "white"}}>
                  RECORD
              </Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={{marginHorizontal: 30}}>
              <Text style={{fontFamily: "Roboto", fontSize: 25, color: "white"}}>
                  TRANSLATE
              </Text>
            </TouchableOpacity>
         
        </View>

        <View style={{height: 50, alignItems: "center", justifyContent: "center"}}>
          <Text style={{ fontFamily: "Roboto", fontSize: 15, color: "white" }}>
              ELAPSED: 0 SEC
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
};

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

export default App;
