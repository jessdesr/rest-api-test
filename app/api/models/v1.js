const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const v1Schema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  value: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('v1', v1Schema)