// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // same as above

// ES6 destructuring
// var user = {name: 'Andrew', age: 25};
// var {name} = user;
// console.log(name);
// //
// var obj = new ObjectID();
// console.log(obj);
// console.log(JSON.stringify(obj.getTimestamp(), undefined, 2));


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');


  // Insert new doc into Users (name, age, location)

  db.collection('Todos').find({
    _id: new ObjectID("5828441614e4524264fb61a5")
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  //db.close();
});
