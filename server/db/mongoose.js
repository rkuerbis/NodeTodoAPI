var mongoose = require('mongoose');

var moment = require('moment');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');


module.exports = {mongoose};
