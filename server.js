// modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// nodemailer
const nodemailer = require('nodemailer');
const emailConfig = require('./.config.js');
const transporter = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
});

// globals
app.set('port', 8082);

// middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// requests
app.get('/', function(req, res){
  console.log('got a request to the server root');
  res.sendFile(__dirname + '/views/email-form.html');
});

// using nodemailer
app.post('/', function(req, res){
  console.log('received post request');
  console.log(req.body);

  // getting email data
  var mailOptions = {
    to: req.body.to,
    from: 'aelluvetaa@gmail.com',
    subject: req.body.subject,
    html: req.body.message
  };

  // sending the email
  transporter.sendMail(mailOptions, function(err, info){
    if(err) return res.status(500).send(err.message);
    res.send("Email sent " + info);
  });
});

app.listen(app.get('port'), () => console.log('server listening in port ' + app.get('port')));
