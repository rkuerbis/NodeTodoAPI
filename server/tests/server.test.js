const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');  // ./../ means backwards one level in directory
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
  // remove all todos from mochadb and install test todos
});



describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();

        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    var text = '';

    request(app)
      .post('/todos')
      .send({text})
      .expect(400)

      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));

      });
  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});



describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    const nottodos = [{
      _id: new ObjectID(),
      text: 'First test not todo'
    }, {
      _id: new ObjectID(),
      text: 'Second test not todo'
    }];
    request(app)
      .get(`/todos/${nottodos[0]._id.toHexString()}`)
      .expect(404)

      .end(done);

  });

  it('should return 404 for non-object ids', (done) => {
    const nottodos = [{
      _id: 123,
      text: 'First test not todo'
    }, {
      _id: new ObjectID(),
      text: 'Second test not todo'
    }];
    request(app)
      .get(`/todos/${nottodos[0]._id}`)
      .expect(404)

      .end(done);

  });



});


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {

    var hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todos) => {
          console.log(todos)
          expect(todos).toBe(null);
          expect(todos).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    const nottodos = [{
      _id: new ObjectID(),
      text: 'First test not todo'
    }, {
      _id: new ObjectID(),
      text: 'Second test not todo'
    }];
    request(app)
      .delete(`/todos/${nottodos[0]._id.toHexString()}`)
      .expect(404)

      .end(done);

  });

  it('should return 404 if object id is invalid', (done) => {
    const nottodos = [{
      _id: 123,
      text: 'First test not todo'
    }, {
      _id: new ObjectID(),
      text: 'Second test not todo'
    }];
    request(app)
      .delete(`/todos/${nottodos[0]._id}`)
      .expect(404)

      .end(done);

  });
});
