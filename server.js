var express = require('express');
var app = express();

var path = require('path');

// viewed at http://localhost:8080
//app.get('/', function(req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'));
//});

app.use(express.static(path.join(__dirname, 'public')));


var auth = require('./api/auth');
app.use('/auth', auth);

/*
app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});
*/

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});