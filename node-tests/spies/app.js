const db = require('./db.js');

module.exports.handleSignup = (email, password) => {
	//Check if email exists

	db.saveUser({email, password});

	//Send welcome email


}