const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const https = require('https');
const logger = require('morgan');
const config = require('./config.json');

let app  = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile('./dist/index.html', {root: __dirname});
});

config.downloads.forEach((dl) => {
  let url = `/download/cv/${dl.lang}`;
  let file = __dirname + dl.src;
  app.get(url, (req, res) => {
    res.download(file);
  });
});

app.post('/mail', (req, res) => {
  verifyRecaptcha(req.body["g-recaptcha-response"], (success) => {
    if (success) {
      const transporter = nodemailer.createTransport(config.nodemailer_transport);
      const mailOptions = {
        from: req.body.from +' ✔ <' + req.body.from + '>', // sender address
        to: config.email,
        subject: req.body.object,
        text: 'sender:' + req.body.from + ' message:' + req.body.content
      };
      transporter.sendMail(mailOptions, (error, info) => {
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
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptcha_secret_key}&response=${key}`;
  https.get(url, (res) => {
    let data = "";
    res.on('data', (chunk) => {
      data += chunk.toString();
    });
    res.on('end', () => {
      try {
        let parsedData = JSON.parse(data);
        console.log(parsedData);
        callback(parsedData.success);
        } catch (e) {
        callback(false);
        }
    });
  });
}

app.listen(process.env.PORT || 8081, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
