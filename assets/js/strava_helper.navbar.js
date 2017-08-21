var strava_helper = (function(strava_helper) {

    strava_helper.navbar = {

        holdNavbar: function() {
            $(".container > header").css({"position": "fixed", "top": "0", "height": "55px"});
            $(".container > .page").css({"top": "55px"});
        },

        addHeatMapLink: function() {
            $("ul.global-nav a[href^=\"/segments/explore\"]")
                .next()
                .append("<li><a href=\"http://labs.strava.com/heatmap\">Global Heat Map</a></li>")
                .css("max-height", "400px");
        },

        init: function() {
            strava_helper.navbar.holdNavbar();
            strava_helper.navbar.addHeatMapLink();
        }
    };

    strava_helper.navbar.init();

    return strava_helper;

}(strava_helper));
