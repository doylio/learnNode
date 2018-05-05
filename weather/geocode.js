//Dependancies
const request = require('request');

//Constants
const APIKEY = "AIzaSyAdmOO0Eea_nH_WwciXiPFfjcpByQ-SvEk";

//
const geocodeAddress = (address, callback) =>{
	const encodedAddress = encodeURIComponent(address);
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${APIKEY}`,
		json: true
	}, (error, response, body) => {
		if(error) {
			callback("Error 1:  Unable to connect to Geocode servers");
		} else if(body.status === "ZERO_RESULTS") {
			callback("Error 2:  Geocode unable to find that address");
		} else if(body.status === "OK") {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng,
			});
		}
	});
};

module.exports.geocodeAddress = geocodeAddress;