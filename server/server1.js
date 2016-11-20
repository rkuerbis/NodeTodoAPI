var moment = require('moment');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var newUser = new User({
  User: 'Ralph Kuerbis',
  email: 'rkuerbis@hotmail.com',
  SignUpAt: moment().unix()
});

newUser.save().then((doc) => {
  console.log('Saved user', doc);
}, (e) => {
  console.log('Unable to save user');

});
