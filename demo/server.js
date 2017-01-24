const path = require('path');
const express = require('express');

const app = express();

app.set('port', 3000);

app.use('/', express.static('demo'));
app.use('/src', express.static('src'));

const server = app.listen(app.get('port'), () => {
  console.log('--------------------------------');
  console.log(' Running Demo App on port:', app.get('port'));
  console.log('--------------------------------');
});