// modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.post('/', function(req, res){
  console.log('received post request');
  console.log(req.body);
  res.end('not available until 2254');
});

app.listen(app.get('port'), () => console.log('server listening in port ' + app.get('port')));
