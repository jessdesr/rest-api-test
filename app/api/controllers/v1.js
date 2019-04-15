'use strict';

const v1Model = require('../models/v1');
const userModel = require('../models/users');

module.exports = {
  getNextAndIncrement: function(req, res, next) {
    userModel.findById(req.body.userId, function(err, user){
      if (err) {
        next(err);
      } else {
        v1Model.findOneAndUpdate({ email: user.email }, { $inc:{ value: 1 } }, { new: true }, function(err, result) {
          res.json({status:"success", message: "Value incremented", data: { value: result.value } });
        });
      }
    });
  },
  getCurrent: function(req, res, next) {
    userModel.findById(req.body.userId, function(err, user){
      if (err) {
        next(err);
      } else {
        v1Model.findOne({ email: user.email }, function(err, result) {
          res.json({status:"success", message: "Value found", data: { value: result.value } });
        });
      }
    });
  },
  setValue: function(req, res, next) {
    userModel.findById(req.body.userId, function(err, user){
      if (err) {
        next(err);
      } else {
        v1Model.findOneAndUpdate({ email: user.email }, { value: req.body.current }, function(err, result) {
          res.json({status:"success", message: `Value reset to ${req.body.current}`});
        });
      }
    });
  },
}