#!/usr/bin/env node
const fs = require("fs");

const moment = require("moment-timezone")
const timezone = moment.tz.guess()
const args = minimist(process.argv.slice()); 

let lat;
let long;
let day = 0;
let tz;


if("h" in args) {
	//Show this help message and exit
	fs.readFile('./helpFile.txt', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(data);
	});
	process.exit(0);
}

//handles latitude
if (args.n) {
    lat = args.n;
} else if (args.s) {
    lat = args.s * -1;
} else {
    console.log("Latitude of range");
    process.exit(0);
}

//handles longitude
if ("e" in args) {
    long = args["e"];
} else if ("w" in args) {
    long = args["w"] * -1;
} else {
    console.log("Longitude out of range");
    process.exit(0);
}

if (args[i] == "-z") {
	//Time zone: uses tz.guess() from moment-timezone by default.
	ti = i + 1;
}

if (args[i] == "-d") {
	//Day to retrieve weather: 0 is today; defaults to 1.
	day = i + 1;
}

if (args[i] == "-j") {
	//Echo pretty JSON from open-meteo API and exit.
}

const response = fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + long + '&daily=precipitation_hours&timezone=' + tz);
