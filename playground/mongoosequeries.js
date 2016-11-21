const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id  = '58317f7d17a22937b01094a1';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
};

Todo.find({
  _id: id
}).then((todos) => {
  console.log('\nTodos:\n', todos);

}); // returns array of one [{object}]

Todo.findOne({
  _id: id

}).then((todo) => {
  console.log('\nTodo:\n', todo);
}); // returns one {object}, no array, use to find by other than id

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('\nId not found\n');
  };
  console.log('\nTodo By Id:\n', todo);
}).catch((e) => console.log(e)); // use to find by id



var id  = '5830348971187e0cc056f849';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
};

User.find({
  _id: id
}).then((users) => {
  console.log('\nUsers:\n', users);

}); // returns array of one [{object}]

User.findOne({
  _id: id

}).then((user) => {
  console.log('\nUser:\n', user);
}); // returns one {object}, no array, use to find by other than id

User.findById(id).then((user) => {
  if (!user) {
    return console.log('\nUser Id not found\n');
  };
  console.log('\nUser By Id:\n', user);
}).catch((e) => console.log(e)); // use to find by id
