'use strict';
const axios = require('axios')
var handleAudio ;
const fs = require('fs');
const util = require('util');

function CopyFiles() {
  const fs = require('fs');
  // destination will be created or overwritten by default.
  fs.copyFile('\\\\172.16.200.108\\Users\\ts-575\\printer.png', '\\\\172.16.200.155\\Users\\hihi\\printerr.png', (err) => {
    if (err) throw err;
    console.log('File was copied to destination');
  });
}

function ConvertAudio(){
  const linear16 = require('linear16');
  
  linear16('C:\\Users\\ts-902\\Desktop/Untitled.wma', './xamalo.wav')
   .then(outPath => console.log(outPath));
  console.log("converted");
}

// [START speech_quickstart]
async function main() {
  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech');
  const fs = require('fs');

  // Creates a client
  const client = new speech.SpeechClient();
  ConvertAudio();

  // The name of the audio file to transcribe
  const fileName = './xamalo.wav';

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');
  //console.log(audioBytes);
  //The audio file's encoding, sample rate in hertz, and BCP-47 language code

  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 22050,
    languageCode: 'vi-VN',
  };
  const requestt = {
    audio: audio,
    config: config,
  };

  //console.log(config);

  axios.post('https://stmiddleserver.herokuapp.com/handle', {
    audio: audio, config: config
    })
    .then((res) => {
      //console.log(`statusCode: ${res.user}`)
      //var response = JSON.parse(res);
      console.log(res);
    })
    .catch((error) => {
      console.error(error)
    })
  /*
  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
  */
}

//const ab = <Buffer ff f3 44 c4 00 00 00 03 48 01 40 00 00 ff e7 4d e4 69 3b ce 3f ff 94 e7 03 28 98 e8 2d ff 95 80 b8 4c c3 a0 5e b3 74 00 f3 50 03 88 f8 0d 40 2f 4d 3a ... >;
function HandleAudio(audio){
  console.log(audio);
  const writeFile = util.promisify(fs.writeFile);
  writeFile('output.mp3', audio , 'binary');
  console.log('Audio content written to file: output.mp3');
}

function GetVoiceFromGoogle(textInput){
    axios.post('http://localhost:3000/givemevoice', {readthistext: textInput})
    .then((res) => {
      //const writeFile = utiltts.promisify(fstts.writeFile);
      //console.log(res.data.feedback);
      //writeFile('output.mp3', res.data.feedback, 'binary');
      //console.log('Audio content written to file: output.mp3');
      //console.log(res.data.feedback.audioContent);
      //handleAudio = res.data.feedback;
      //console.log(res.data.feedback);
      var bufferhere = res.data.feedback;
      var buf = Buffer.from(bufferhere, 'base64');
      console.log(buf);
      HandleAudio(buf);
    })
    .catch((error) => {
      console.error(error)
    })
    
  //HandleAudio(handleAudio);
}

//CopyFiles();
GetVoiceFromGoogle("Mình đã thành công hay chưa nhỉ");


