var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body.text);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

  console.log(req.body);

});




app.listen(port, () => {
  console.log(`Server is up on port:  ${port}`);
});


module.exports = {app};
