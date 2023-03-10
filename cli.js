#!/usr/bin/env node

import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";
const fs = require("fs");

//parse args
const args = minimist(process.argv.slice()); 

let lat;
let long;
let day = 0;
let tz;


if("h" in args) {
	//show this help message and exit
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

//time zone
if ("t" in args) {
    tz = args.t;
} else {
    tz = moment.tz.guess();
}

//handle request
const fetch_url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + long + "&timezone=" + tz + "&current_weather=true&daily=precipitation_hours";
const response = await fetch(fetch_url);
const data = await response.json();

if("j" in args) {
    console.log(data);
    process.exit(0);
}

if ("d" in args) {
    day = args.d 
} else {
    day = 1;
}

if (day == 0) {
    if (data.daily.precipitation_hours[day] > 0) {
        console.log("you should probably wear galoshes today.");
    } else {
        console.log("you don't have to wear galoshes today.");
    }
} else if (day > 1) {
   if (data.daily.precipitation_hours[day] > 0) {
        console.log("you should probably wear galoshes in" + day + "days.");
    } else {
       console.log("you don't have to wear galoshes in" + day + "days.");
    }
} else {
   if (data.daily.precipitation_hours[1] > 0) {
        console.log("you should probably wear galoshes tomorrow.");
    } else {
       console.log("you don't have to wear galoshes tomorrow.");
    }
}