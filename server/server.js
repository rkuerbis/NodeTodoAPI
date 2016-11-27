var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');

var {ObjectID} = require('mongodb');
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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

var id  = '58317f7d17a22937b01094a1';

//GET /todos/1234324
app.get('/todos/:id', (req, res) => {
  console.log(req.params.id);
  var id = req.params.id;
  console.log(id);
  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send();
  };

  console.log('ID valid');
  Todo.findById(id).then((todo) => {
    if (!todo) {
      console.log('\nId not found\n');
      return res.status(404).send();
    }
    console.log('\nTodo By Id:\n', todo);
    res.send({todo});
  }).catch((e) => {
    console.log(e); // use to find by id
    res.status(400).send();
  });
});


app.delete('/todos/:id', (req, res) => {
  console.log(req.params.id);
  var id = req.params.id;
  console.log(id);
  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send();
  };

  console.log('ID valid');

  Todo.findByIdAndRemove(id).then((todo) => {
     console.log(todo);
     if (!todo) {
      console.log('\nId not found\n');
      return res.status(404).send();
    }
    console.log('\nRemoved Todo By Id:\n', todo);
    res.send({todo});
  }).catch((e) => {
    console.log(e); // use to find by id
    res.status(400).send();
  });
});



app.listen(port, () => {
  console.log(`Server is up on port:  ${port}`);
});


module.exports = {app};
