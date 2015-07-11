var pageMod = require("sdk/page-mod");
var data		= require("sdk/self").data;
var prefSet	= require("sdk/simple-prefs");

pageMod.PageMod({
  include: "*.strava.com",
  contentScriptWhen: "ready",
  contentScriptFile: [ data.url("zepto.js"), data.url("strava.js") ],
  contentStyleFile: data.url("strava.css"),
  onAttach: function(worker) {
  	var settings = {
  		'addKudosButton': prefSet.prefs.addKudosButton,
  		'addVeloViewerLinks': prefSet.prefs.addVeloViewerLinks,
  		'fixateNavBar': prefSet.prefs.fixateNavBar,
  		'addGlobalHeatMapLink': prefSet.prefs.addGlobalHeatMapLink,
  		'removeClutter': prefSet.prefs.removeClutter
  	}

  	worker.port.emit("get-prefs", settings);
  }
});
