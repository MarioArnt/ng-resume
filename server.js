var express = require('express');
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var https = require('https');

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
  verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
    if (success) {
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
          //error 2: Internal server error mail could not been sent, try again later
        }
        else{
          console.log('Message sent: ' + info.response);
          //success
        }
      });
    } else {
      //error 1: bad captcha
    }
  });
});
var SECRET = "6Lcj0gATAAAAADGOzCmp3-W8wpcarZRueKoQERrs";

function verifyRecaptcha(key, callback) {
  https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk.toString();
    });
    res.on('end', function() {
      try {
        var parsedData = JSON.parse(data);
        console.log(parsedData);
        callback(parsedData.success);
        } catch (e) {
        callback(false);
        }
    });
  });
}
app.listen(8080);
console.log('Magic happens on 8080');
