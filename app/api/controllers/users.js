const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports = {
 create: (req, res, next) => {  
  userModel.create({ 
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }, (err, result) => {
      if (err) { 
        next(err); 
      } else {
        console.log(result);
        const token = jwt.sign({id: result._id}, req.app.get('secretKey'), { expiresIn: '1h' });
        res.json({
          status: "success",
          message: "User added successfully",
          data: { user: result.email, token: token },
        });
      }
  });
},

authenticate: function(req, res, next) {
  userModel.findOne({ email:req.body.email }, (err, userInfo) => {
    if (err) {
      next(err);
    } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
            res.json({ status:"success", message: "User found!", data:{user: userInfo.email, token:token }});
        } else {
            res.json({ status:"error", message: "Invalid email/password", data:null });
        }
    }
  });
 },
}