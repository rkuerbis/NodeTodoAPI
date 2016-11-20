var mongoose = require('mongoose');

var moment = require('moment');



var User = mongoose.model('User', {
  User: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  SignUpAt: {
    type: Number,
    default: null
  }
});

module.exports = {User};
