var self        = require('sdk/self');
var pageMod     = require("sdk/page-mod");

pageMod.PageMod({
    include: "*.strava.com",
    contentScriptFile: [
        "./jquery-1.11.3.js",
        "./strava.js"
    ],
    contentStyleFile: "./strava.css"
});
