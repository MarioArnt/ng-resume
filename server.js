var express = require('express');
var app  = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.sendFile('./dist/index.html');
});

app.get('/download/cv/en', function(req, res){
  var file = __dirname + '/dl/CV-en.pdf';
  res.download(file);
});

app.get('/download/cv/fr', function(req, res){
  var file = __dirname + '/dl/CV-fr.pdf';
  res.download(file);
});

app.get('/download/cv/es', function(req, res){
  var file = __dirname + '/dl/CV-es.pdf';
  res.download(file);
});

app.listen(8080);
console.log('Magic happens on 8080');
