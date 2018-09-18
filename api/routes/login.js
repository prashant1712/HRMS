const express = require('express');
const router  = express.Router();
const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require("bcrypt");
const User= require('../models/employees')

router.post('/', function (req, res, next) {
    // console.log(req.body.username)
    User.findOne({
        username: req.body.username
      }, function(err, user) {
        if (err) throw err;
    
        if (!user) {
          res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
          // console.log(user.roles)
          user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
              
                
              var token = jwt.sign({
                                  _id: user._id,
                                  "username": user.username,
                                  "fisrstname": user.firsstname,
                                  "roles": user.roles
                                }, "prashantposist", {
                expiresIn: 10080 // in seconds
              }); 
              res.json({ success: true, token: 'JWT ' + token });
            }
            else{
              res.sendStatus(403);
            }
          });
        }
      });
    
});



module.exports= router;