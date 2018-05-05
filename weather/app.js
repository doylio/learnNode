//Dependancies
const request = require('request');
const yargs = require('yargs');

//Required Files
const geocode = require('./geocode.js');
const weather = require('./weather.js');


const argv = yargs
	.options({
		a: {
			demand: true,
			alias: "address",
			describe: "Address for which to fetch weather",
			string: true,
		}
	})
	.help()
	.argv;

geocode.geocodeAddress(argv.address, (errorMessage, geocodeResults) => {
	if(errorMessage) {
		console.log(errorMessage);
	} else {
		console.log(geocodeResults.address);
		weather.getWeather(geocodeResults.latitude, geocodeResults.longitude, (errorMessage, weatherResults) => {
			if(errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`It's currently ${weatherResults.temperature}.  It feels like ${weatherResults.apparentTemperature}`);
			}
		});		
	}
});



