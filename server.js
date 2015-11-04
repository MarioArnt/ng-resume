var express = require('express');
var app  = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.sendFile('./dist/index.html');
});

app.get('/download/cv/en', function(req, res){
  var file = __dirname + '/dl/CV-en.pdf';
  res.download(file); // Set disposition and send it.
});

app.listen(8080);
console.log('Magic happens on 8080');
