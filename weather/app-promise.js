//Dependancies
const axios = require('axios');
const yargs = require('yargs');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geoAPIKEY}`;

axios.get(geocodeURL)
.then((response) => {
	if(response.data.status === 'ZERO_RESULTS') {
		throw new Error("Error 2:  Geocode unable to find that address");
	}
	const {lat, lng} = response.data.results[0].geometry.location;
	const weatherURL = `https://api.darksky.net/forecast/${weatherAPIKEY}/${lat},${lng}`

	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherURL);

})
.then((response) => {
	const {temperature, apparentTemperature} = response.data.currently;
	console.log(`It's currently ${temperature}.  It feels like ${apparentTemperature}`);
})
.catch((e) => {
	if(e.code === 'ECONNREFUSED') {
		console.log('Unable to connect to geocode servers');
	} else {
		console.log(e.message);
	}
});