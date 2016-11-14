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

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //
  // });

  // Insert new doc into Users (name, age, location)

  db.collection('Users').insertOne({
    name: 'Ralph Kuerbis',
    age: 56,
    location: 'Vancouver'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));

  });


  db.close();
});
