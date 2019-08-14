'use strict';

// [START tts_quickstart]
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
async function main() {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();

  // The text to synthesize
  const text = 'Mình đã thành công hay chưa nhỉ';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'vi-VN', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  var hihi = JSON.stringify(response);
  console.log(`hihi: ${hihi}`);
  SeparateYou(hihi);
}


function SeparateYou(response){
  console.log(JSON.parse(response));
  //const writeFile = util.promisify(fs.writeFile);
  //writeFile('output11.mp3', response.audioContent, 'binary');
  //console.log(response);
  //console.log('Audio content written to file: output.mp3');
}
// [END tts_quickstart]
main().catch(console.error);