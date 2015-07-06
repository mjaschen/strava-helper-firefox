var self        = require('sdk/self');
var pageMod     = require("sdk/page-mod");

pageMod.PageMod({
    include: "*.strava.com",
    contentScriptFile: [
        "./zepto.js",
        "./strava.js"
    ],
    contentStyleFile: "./strava.css"
});
