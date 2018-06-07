const expect = require('expect');
const rewire = require('rewire');

//Rewires
const app = rewire('./app')


describe('App', () => {
	const db = {
		saveUser: expect.createSpy()
	};
	app.__set__('db', db);

	it('should call saveuser with user object' , () => {
		const email = 'mysecretemail@mail.com';
		const password = 'notsosecret';

		app.handleSignup(email, password);
		expect(db.saveUser).toHaveBeenCalledWith({email, password});
	});


});