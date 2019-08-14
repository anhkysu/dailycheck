const linear16 = require('linear16');
 
linear16('./testfromphone.wav', './xamalo.wav')
   .then(outPath => console.log(outPath));