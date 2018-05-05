//Dependancies
const request = require('request');

//Constants
const APIKEY = "AIzaSyAdmOO0Eea_nH_WwciXiPFfjcpByQ-SvEk";


const geocodeAddress = (address) => {
	const encodedAddress = encodeURIComponent(address);
	return new Promise((resolve, reject) => {
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${APIKEY}`,
			json: true
		}, (error, response, body) => {
			if(error) {
				reject("Error 1:  Unable to connect to Geocode servers");
			} else if(body.status === "ZERO_RESULTS") {
				reject("Error 2:  Geocode unable to find that address");
			} else if(body.status === "OK") {
				resolve({
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng,
				});
			}
		});
	})

};

geocodeAddress("90210").then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, console.log);