const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/rest-api-test';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
