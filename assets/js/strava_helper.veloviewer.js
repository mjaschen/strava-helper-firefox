(function(strava_helper) {

    strava_helper.veloviewer = {

        addVeloViewerLinkToNavbar: function () {
            $("ul.global-nav").append($("<li><a class=\"nav-link link-veloviewer\" href=\"https://veloviewer.com/\" target=\"_blank\">VeloViewer</a></li>"));
        },

        addVeloViewerLinkToActivityPage: function () {
            if (! strava_helper.util.isActivityPage()) {
                return;
            }

            var brws = typeof chrome === "undefined" ? browser : chrome;

            var activity_id = strava_helper.util.getActivityId();
            var img = strava_helper.util.getExtensionURL("assets/img/logo-strava-helper-labs.svg");

            $("section.others-section").append("<div style=\"margin-left: 10px;\"><div class=\"labs-logo\"><img alt=\"Strava Helper\" src=\"" + img + "\"></div><a class=\"minimal flybys-link view-all-link with-sprite link-veloviewer\" href=\"https://veloviewer.com/activities/" + activity_id + "\" target=\"_blank\">VeloViewer</a></div>");
        },

        init: function() {
            strava_helper.veloviewer.addVeloViewerLinkToNavbar();
            strava_helper.veloviewer.addVeloViewerLinkToActivityPage();
        }

    };

    strava_helper.veloviewer.init();

    return strava_helper;

}(strava_helper));
