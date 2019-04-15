'use strict';

const express = require('express');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const v1 = require('./routes/v1');
const mongoose = require('./config/db');

const app = express();

app.set('secretKey', 'elephants-arugula-bark-telephone');

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
 res.json({"tutorial" : "Build REST API with node.js"});
});

app.use('/users', users);

app.get('/favicon.ico', function(req, res) {
  res.sendStatus(204);
});

app.use('/v1', validateUser, v1);

function validateUser(req, res, next) {
  let token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}

app.use ((err, req, res, next) => {
  console.log(err);

  if (err.status === 404) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => { 
  console.log('Node server listening on port 3000');
});

module.exports = app;
