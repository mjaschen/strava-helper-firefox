var self        = require('sdk/self');
var pageMod     = require("sdk/page-mod");
var data        = self.data;

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

pageMod.PageMod({
    include: "*.strava.com",
    contentScriptFile: [
        "./jquery-1.11.3.js",
        "./strava.js"
    ],
    contentStyleFile: "./strava.css"
});
