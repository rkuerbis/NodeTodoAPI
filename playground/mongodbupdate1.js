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

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("582c32a98c175eddee1902a6")
  }, {
    $set: {
      name: 'Ralph Herbert Kuerbis'

    }
  }, {
    returnOriginal: false
  }).then((result) => {


    console.log(result);
    
    console.log(result.value.age);
    db.collection('Users').findOneAndUpdate({
      _id: new ObjectID("582c32a98c175eddee1902a6")
    }, {
      $set: {
        age: result.value.age + 1

      }
    }, {
      returnOriginal: false
    }).then((result) => {


      console.log(result);

    }, (err) => {
      console.log('Unable to fetch todos', err);
    });


//    console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  db.collection('Users').find({ name: "Ralph Kuerbis" }).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));

//    console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
    console.log('Unable to fetch users', err);
  });


  //db.close();
});
