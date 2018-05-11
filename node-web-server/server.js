//Modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Declare server
const app = express();

//Middleware
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/Public"));
	//Logs requests
app.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}:${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to server.log');
		}
	});
	console.log(log);
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});


//Handlebars Helpers
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());


//Server response actions
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome the page!  Get pumped!'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: "About Page",
	});
})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: "Unable to fulfill request"
	});
})



//Listening to Port
app.listen(3000, () => {
	console.log("Server is up on port 3000");
});