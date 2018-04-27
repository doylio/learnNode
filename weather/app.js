const request = require('request');

const geocodeApiKey = "AIzaSyAdmOO0Eea_nH_WwciXiPFfjcpByQ-SvEk";

request({
	url: "https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lumbard%20st%20Philadelphia" + `&key=${geocodeApiKey}`,
	json: true
}, (error, response, body) => {
	console.log(`Address: ${body.results[0].formatted_address}`);
	console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
	console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});