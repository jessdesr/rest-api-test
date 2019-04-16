'use strict';

const express = require('express');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const v1 = require('./routes/v1');
const mongoose = require('./config/db');
const config = require('./config/config.json');

const app = express();

app.set('secretKey', config.secret);

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', function(req, res){
 res.json({"message" : "successfully connected to the Number Storage"});
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
      if (req.method !== "OPTIONS") {
        res.status(400);
        res.json({status:"error", message: err.message, data:null});
      } else {
        res.status(200);
        res.json({status:"success", data:null});
      }
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;

app.listen(port, () => { 
  console.log(`Node server listening on port ${port}`);
});

module.exports = app;
