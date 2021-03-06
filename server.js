var express = require('express');
var path = require('path');

var port = process.env.PORT || 7000;
var app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started port: ${port}`);
  }
});