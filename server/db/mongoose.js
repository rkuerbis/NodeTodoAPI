var mongoose = require('mongoose');

var moment = require('moment');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


module.exports = {mongoose};
