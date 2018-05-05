//Dependancies
const axios = require('axios');
const yargs = require('yargs');
const timestamp = require('unix-timestamp');

//Constants
const geoAPIKEY = "AIzaSyAdmOO0Eea_nH_WwciXiPFfjcpByQ-SvEk";
const weatherAPIKEY = "0c2d46adcf0c5f5ce7e55393420c9c10";


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

getWeather(argv.address);

async function getWeather(address) {
	const encodedAddress = encodeURIComponent(address);
	const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geoAPIKEY}`;
	try {
		const geocode = await axios.get(geocodeURL);
		if(geocode.data.status === 'ZERO_RESULTS') {
			throw new Error('Error:  Unable to find that address!');
		}
		console.log(geocode.data.results[0].formatted_address);

		const {lat, lng} = geocode.data.results[0].geometry.location;
		const weatherURL = `https://api.darksky.net/forecast/${weatherAPIKEY}/${lat},${lng}`

		const weather = await axios.get(weatherURL);
		const {temperature, apparentTemperature} = weather.data.currently;

		console.log(`It's currently ${temperature}C.  It feels like ${apparentTemperature}C`);

		const parsedWeather = parseDaily(weather.data);

		console.log(timestamp.toDate(parsedWeather.low.time));


	} catch (err) {
		if(err.code === 'ECONNREFUSED') {
			console.log('Unable to connect to geocode servers');
		} else{
			console.log(err);
		}
	}
}

function parseDaily(info) {
	let high = info.hourly.data[0];
	let low = info.hourly.data[0];

	for(let i = 0; i < info.hourly.data.length; i++) {
		if(info.hourly.data[i].temperature > high.temperature) {
			high = info.hourly.data[i];
		}
		if(info.hourly.data[i].temperature < low.temperature) {
			low = info.hourly.data[i];	
		}
	}

	return {
		high,
		low,
	};
}