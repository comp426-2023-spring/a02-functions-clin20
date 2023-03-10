#!/usr/bin/env node
const [,, ...args] = process.argv;
const fs = require("fs");

const moment = require("moment-timezone")
const timezone = moment.tz.guess()

let i = 0;
let lat = "";
let long = "";
let day = 0;
let ti = timezone;

while (i < args.length) {
	if(args[i] == "-h") {
		//Show this help message and exit
		fs.readFile('./helpFile.txt', 'utf8', (err, data) => {
			if (err) {
			  console.error(err);
			  return;
			}
			console.log(data);
		  });
	} else if (args[i] == "-n") {
		//positive latitude, north
		lat = i + 1;
	} else if (args[i] == "-s") {
		//negative latitude, south
		lat = i + 1;
	} else if (args[i] == "-e") {
		//positive longitude, east
		long = i + 1;
	} else if (args[i] == "-w") {
		//negative longitude, west
		long = i + 1;
	} else if (args[i] == "-z") {
		//Time zone: uses tz.guess() from moment-timezone by default.
		ti = i + 1;
	} else if (args[i] == "-d") {
		//Day to retrieve weather: 0 is today; defaults to 1.
		day = i + 1;
	} else if (args[i] == "-j") {
		//Echo pretty JSON from open-meteo API and exit.
	}
	i++;
}

const response = fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + long + '&daily=precipitation_hours&timezone=' + tz);
