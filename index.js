var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;
var prefSet = require("sdk/simple-prefs");

pageMod.PageMod({
    include: "*.strava.com",
    contentScriptWhen: "ready",
    contentScriptFile: [
        data.url("vendor/jquery/jquery.min.js"),
        data.url("vendor/toastr/toastr.min.js"),

        data.url("sh.module.js"),
        data.url("sh.logger.js"),
        data.url("sh.pipe.js"),
        data.url("sh.util.js"),
        data.url("sh.prefs.js"),
        data.url("sh.fx.js"),

        data.url("ui/ui.module.js"),
        data.url("ui/navbar.js"),
        data.url("ui/cleanup.js"),

        data.url("ux/ux.module.js"),
        data.url("ux/kudosbutton.js"),
        data.url("ux/autoload.js"),
        data.url("ux/segmentleaderboard.js"),
        data.url("ux/veloviewer.js"),
        data.url("ux/notifications.js"),

        data.url("sh.main.js")
    ],
    contentStyleFile: [
        data.url("vendor/animate.css/animate.min.css"),
        data.url("vendor/toastr/toastr.min.css"),
        data.url("style/strava.css")
    ],
    onAttach: function(worker) {
        var settings = {
            'addKudosButton': prefSet.prefs.addKudosButton,
            'addVeloViewerLinks': prefSet.prefs.addVeloViewerLinks,
            'fixateNavBar': prefSet.prefs.fixateNavBar,
            'addGlobalHeatMapLink': prefSet.prefs.addGlobalHeatMapLink,
            'removeClutter': prefSet.prefs.removeClutter,
            'removeChallengesFromFeed': prefSet.prefs.removeChallengesFromFeed,
            'enableCustomLeaderboardType' : prefSet.prefs.enableCustomLeaderboardType,
            'leaderboardType': prefSet.prefs.leaderboardType,
            'autoloadActivities': prefSet.prefs.autoloadActivities,
            'removeConsecutiveAvatarsInFeed': prefSet.prefs.removeConsecutiveAvatarsInFeed,
            'enableAnimations': prefSet.prefs.enableAnimations,
            'changeDefaultUploadToFile': prefSet.prefs.changeDefaultUploadToFile,
            'enableNotifications': prefSet.prefs.enableNotifications,
            'firstInstall': prefSet.prefs.firstInstall
        }
        worker.port.emit("get-prefs", settings);

        // the add-on was started for the first time, set the
        // preference to false so the welcome notification won't
        // be displayed again.
        worker.port.on('first-install-notification-displayed', function() {
            prefSet.prefs.firstInstall = false;
        });
    }
});
