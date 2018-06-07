const express = require('express');

const users = [{
	name: "Harry Potter",
	age: 17,
	interests: ["quidditch", "magic", "girls"]
},
{
	name: "Ginny Weasley",
	age: 16,
	interests: ["quidditch", "Harry", "red-hair"]
},
{
	name: "Tom Riddle",
	age: 67,
	interests: ["dark magic", "pure-bloodlines", "silly pseudonyms"]
}];

const app = express();

app.get('/', (req, res) => {
	res.status(404).send({
		error: "Page not found",
		name:  "Todo App v1.0"
	});
});

app.get('/users', (req, res) => {
	res.send(users);
})

app.listen(3000);

module.exports.app = app;