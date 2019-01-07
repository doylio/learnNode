const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const dummyTodos = [
{
	_id: new ObjectID(),
	text: "First dummy todo"
}, {
	_id: new ObjectID(),
	text: "Second dummy todo",
	completed: true,
	completedAt: 333
}];
 
beforeEach((done) => {
	Todo.deleteMany().then(() => {
		return Todo.insertMany(dummyTodos)
	})
	.then(() => done())
	.catch(done);
});
 
describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		let text = 'Test todo text'
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text)
			})
			.end((err, res) => {
				if(err) {
					return done(err)
				}

				Todo.find().then(todos => {
					expect(todos.length).toBe(3)
					expect(todos.reverse()[0].text).toBe(text)
					done()
				}).catch(err => done(err))
			});
	});
	it('should not create todo with invalid body data', (done) => {
		let test = {}
		request(app)
			.post('/todos')
			.send(test)
			.expect(400)
			.end((err, res) => {
				if(err) {
					return done(err)
				}

				Todo.find().then(todos => {
					expect(todos.length).toBe(2)
					done()
				}).catch(done)
			});
	});
});
 
describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect(res => {
				expect(res.body.todos.length).toBe(2)
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${dummyTodos[0]._id.toHexString()}`)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(dummyTodos[0].text)
			})
			.end(done);
	});
	it('should return 404 if todo not found', done => {
		let hexId = new ObjectID()
		request(app)
			.get(`/todos/${hexId.toHexString()}`)
			.expect(404)
			.end(done)
	});
	it('should return 404 for non ObjectIDs', done => {
		let randomID = Math.round(Math.random() * 1000)
		request(app)
			.get(`/todos/${randomID}`)
			.expect(404)
			.end(done)
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo', done => {
		let hexId = dummyTodos[1]._id.toHexString();
		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect(res => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) => {
				if(err) {
					return done(err)
				}
				Todo.findById(hexId).then(todo => {
					expect(todo).toBeNull()
					done()
				}).catch(e => done(e));
			})
	});
	it('should return 404 if todo not found', done => {
		let hexId = new ObjectID()
		request(app)
			.delete(`/todos/${hexId.toHexString()}`)
			.expect(404)
			.end(done)
	});
	it('should return 404 if ObjectID is invalid', done => {
		let randomID = Math.round(Math.random() * 1000)
		request(app)
			.delete(`/todos/${randomID}`)
			.expect(404)
			.end(done)
	});
});

describe('PATCH /todos/:id', () => {
	it('should update the todo', done => {
		const id = dummyTodos[0]._id.toHexString();
		const test = {
			text: 'This text has been changed',
			completed: true
		};
		request(app)
			.patch(`/todos/${id}`)
			.send(test)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(test.text);
				expect(res.body.todo.completed).toBe(true);
				expect(typeof res.body.todo.completedAt).toBe('number');
			})
			.end(done);

	});
	it('should clear completedAt when todo is not completed', done => {
		const id = dummyTodos[1]._id.toHexString();
		const test = {
			text: 'This has also been changed',
			completed: false
		}
		request(app)
			.patch(`/todos/${id}`)
			.send(test)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(test.text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toBeNull();
			})
			.end(done);
	});
});