var express = require('express');
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var https = require('https');
var logger = require('morgan')

var app  = express();

var SECRET = "6Lcj0gATAAAAADGOzCmp3-W8wpcarZRueKoQERrs";

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
      nodemailer.sendmail = true;
      var transporter = nodemailer.createTransport(smtpTransport({
          host: 'localhost',
          port: 25,
      }));
      transporter.sendMail({
        from: req.body.from,
        to: "mario.arnautou@gmail.com",
        subject: req.body.object,
        text: req.body.content
      }, function(error, info){
        if(error){
          console.log(error);
          res.status(500);
          res.json({"success": false, "error": "Internal server error"});
        }
        else{
          console.log('Message sent: ' + info.response);
          res.status(200);
          res.json({"success": true});
        }
      });
    } else {
      res.status(500);
      res.json({"success": false, "error": "Bad captcha"});
    }
  });
});

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
