#!/usr/bin/env node

import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";

//parse args
const args = minimist(process.argv.slice()); 

let lat;
let long;
let day = 0;
let tz;


if("h" in args) {
	//show this help message and exit
	console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("   -h            Show this help message and exit.");
    console.log("   -n, -s        Latitude: N positive; S negative.");
    console.log("   -e, -w        Longitude: E positive; W negative.");
    console.log("   -z            Time zone: uses tz.guess() from moment-timezone by default.");
    console.log("   -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
    console.log("   -j            Echo pretty JSON from open-meteo API and exit.");
	process.exit(0);
}

//handles latitude
if (args.n) {
    lat = args.n;
} else if (args.s) {
    lat = args.s * -1;
} else {
    console.log("Latitude must be in range");
    process.exit(0);
}

//handles longitude
if ("e" in args) {
    long = args["e"];
} else if ("w" in args) {
    long = args["w"] * -1;
} else {
    console.log("Longitude must be in range");
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