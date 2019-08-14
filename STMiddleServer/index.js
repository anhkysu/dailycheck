const path = require('path');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
//const transcription = "loremipsum";
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const WS_PORT = process.env.PORT || 3001;
const HTTP_PORT = process.env.PORT || 3000;
// array of connected websocket clients
let connectedClients = [];

async function SendToGoogle(inputdata) {
    const speech = require('@google-cloud/speech');
    const client = new speech.SpeechClient();
    const [response] = await client.recognize(inputdata);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    return transcription;
    //console.log(`Transcription: ${transcription}`);
}

async function GetVoiceFromGoogle(textInput){
    const textToSpeech = require('@google-cloud/text-to-speech');
    // Import other required libraries
    // Creates a client
    const clienttts = new textToSpeech.TextToSpeechClient();
    // The text to synthesize
    const text = textInput;
    // Construct the request
    const requesttts = {
        input: { text: text },
        // Select the language and SSML Voice Gender (optional)
        voice: { languageCode: 'vi-VN', ssmlGender: 'NEUTRAL' },
        // Select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };
    // Performs the Text-to-Speech request
    const [responsetts] = await clienttts.synthesizeSpeech(requesttts);
    console.log(responsetts.audioContent);
    return responsetts.audioContent
    // Write the binary audio content to a local file
}

app.post('/givemevoice', (req, res) => {
    const text = req.body.readthistext;
    GetVoiceFromGoogle(text).then((content)=>{res.send(JSON.stringify({feedback:`${content}`}))}).catch((error)=>{console.error});
});

// HTTP stuff
app.post('/handle', (req, res) => {
    //console.log(`data:${req.body}`);
    const audio = req.body.audio;
    const config = req.body.config;
    const requestt = {
        audio: audio,
        config: config,
      };
    //console.log(requestt);
    SendToGoogle(requestt).then((result)=>{ res.send(JSON.stringify({feedback:`${result}`}));}).catch((error) => {console.error(error)});
   
});

app.get('/client', (req, res) => res.sendFile(path.resolve(__dirname, './appandroid.apk')));
app.get('/streamer', (req, res) => res.sendFile(path.resolve(__dirname, './streamer.html')));
app.listen(HTTP_PORT, () => console.log(`HTTP server listening at http://localhost:${HTTP_PORT}`));
