var express = require('express');
var router = express.Router();
var User = require('../app/model/user.js');
var mongoose = require('mongoose');
var config = require('../config/database');
var passport = require('passport');

mongoose.connect(config.database); // connect to database
require('../config/passport')(passport); // pass passport for configuration

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// create a new user account (POST http://localhost:8080/api/signup)
router.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
       res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      userName: req.body.name,          // name changed to username.----
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

module.exports = router;
