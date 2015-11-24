var express = require('express');
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var app  = express();

app.use(bodyParser.urlencoded({ extended: false }));
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

app.post('/mail', function(req, res){
  var transporter = nodemailer.createTransport(smtpTransport({
      host: 'localhost',
      port: 465,
  }));
  transporter.sendMail({
    from: req.body.from,
    to: "mario.arnautou@gmail.com",
    subject: req.body.object,
    text: req.body.content
  }, function(error, info){
    if(error){
      console.log(error);
    }
    else{
      console.log('Message sent: ' + info.response);
    }
  });
});

app.listen(8080);
console.log('Magic happens on 8080');
