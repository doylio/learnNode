//Dependancies
const axios = require('axios');
const yargs = require('yargs');
const timeNumber = require('time-number');

//Constants
const geoAPIKEY = "AIzaSyAdmOO0Eea_nH_WwciXiPFfjcpByQ-SvEk";
const weatherAPIKEY = "0c2d46adcf0c5f5ce7e55393420c9c10";
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const argv = yargs
	.options({
		address: {
			demandOption: true,
			alias: "a",
			describe: "Address for which to fetch weather",
			string: true,
		},
		current: {
			demandOption: false,
			alias: "c",
			describe: "Set flag for current weather information (default if no flags selected)",
			boolean: true,
		},
		today: {
			demandOption: false,
			alias: "t",
			describe: "Set flag for today's weather forecast",
			boolean: true,
		},
		week: {
			demandOption: false,
			alias: "w",
			describe: "Set flag for weekly forecast",
			boolean: true,
		},
		hour: {
			demandOption: false,
			alias: "h",
			describe: "Search for forecast at a specific time in 24hr format (XX:XX)",
			string: true,
		}
	})
	.help()
	.argv;



console.log("");
if(argv.c + Boolean(argv.h) + argv.t + argv.w > 1) {
	console.log("Error:  Only set one flag per request! \n Add -help flag for more info");
} else if (argv.h) {
	try {
		timeNumber.timeToInt(argv.h);
	} catch(err) {
		console.log(`Error: supported time formats are 'HH', 'HH:mm', 'HH:mm:ss', provided value: ${argv.h} doesn't match any of them.`);
	}
} else {
	getWeather(argv.address);
}


const alertString = (data) => {
	//Check for high wind speed or high UV index
	let alerts = "";
	if(data.uvIndex > 7) {
		alerts = "\t**ALERT:  HIGH UV INDEX**\n";
	}
	if(data.windSpeed > 20) {
		alerts = alerts + "\t**ALERT:  HIGH WIND SPEED";
	}
	return alerts;
}

const dailyForecastString = (day) => {
	const d = new Date(day.time * 1000).getDay();
	const highTime = new Date(day.temperatureHighTime * 1000);
	const lowTime = new Date(day.temperatureLowTime * 1000);
	const returnString = 
		`${weekday[d]}:\n`
		+ `${alertString(day)}`
		+ `\t${day.summary}\n`
		+ `\tHigh: ${day.temperatureHigh}°C (${highTime.getHours()}:${highTime.getMinutes()})\n`
		+ `\tLow:  ${day.temperatureLow}°C (${lowTime.getHours()}:${lowTime.getMinutes()})\n`
		+ `\tPOP: ${day.precipProbability * 100}%`
	;
	return returnString;
}


const displayWeather = (weather) => {
	if(weather.alerts) {
		weather.alerts.forEach(alert => console.log(alert.description));
	}
	if(argv.week) {
		//Print weekly forecast
		console.log("Weekly Forecast:");
		console.log(weather.daily.summary);
		//Forecast for each day
		for(let i = 0; i < weather.daily.data.length; i++) {
			console.log(dailyForecastString(weather.daily.data[i]));
		}

	} else if(argv.today) {
		//Print today's forecast
		console.log(dailyForecastString(weather.daily.data[0]));
	} else if(argv.h) {
		const intTime = Math.round(timeNumber.timeToInt(argv.h) / 3600) * 3600;
		//TODO:  Temp and POP at that specific hour
	} else {
		//Print current forecast
		const {temperature, apparentTemperature, summary} = weather.data.currently;
		console.log(`It's currently ${celcius(temperature)}C.  It feels like ${celcius(apparentTemperature)}C.  ${summary}.`);
	}
};




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
		const weatherURL = `https://api.darksky.net/forecast/${weatherAPIKEY}/${lat},${lng}?units=si`

		const weather = await axios.get(weatherURL);
		
		displayWeather(weather.data);

	} catch (err) {
		if(err.code === 'ECONNREFUSED') {
			console.log('Unable to connect to geocode servers');
		} else{
			console.log(err);
		}
	}
}

