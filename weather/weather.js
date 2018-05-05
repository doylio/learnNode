const request = require('request');

const APIKEY = "0c2d46adcf0c5f5ce7e55393420c9c10";


const getWeather = (lat, lng, callback) => {
	request({
		url: `https://api.darksky.net/forecast/${APIKEY}/${lat},${lng}`,
		json: true,
	}, (error, response, body) => {
		if(!error && response) {
			callback(undefined,  {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature,
			});
		} else {
			callback("Error 3:  Unable to fetch weather"); 
		}
	});
};

module.exports.getWeather = getWeather;