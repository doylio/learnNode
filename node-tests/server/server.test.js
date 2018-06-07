const request = require('supertest');
const expect = require('expect');


const app = require('./server.js').app;


describe('Server', () => {
	it('should return hello world', (done) => {
		request(app)
			.get('/')
			.expect(404)
			.expect((res)=> {
				expect(res.body).toInclude({
					error: "Page not found"
				});
			})
			.end(done);
	});

	it('should return the users array', (done) => {
		request(app)
			.get('/users')
			.expect(200)
			.expect((res) => {
				expect(res.body).toInclude({
					name: "Harry Potter",
					age: 17,
					interests: ["quidditch", "magic", "girls"]
				})
			})
			.end(done);
	});
});