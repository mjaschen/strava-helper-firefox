var StravaHelper = (function(sh) {

    var logger = new sh.Logger('ui.navbar');

    sh.ui.navbar = {
        fixate: function() {
            if (sh.prefs.fixateNavBar) {
                logger.debug('fixating top navbar');
                fixateNavBarToTop();
            }
        },

        addGlobalHeatMapLink: function() {
            if (sh.prefs.addGlobalHeatMapLink) {
                logger.debug('adding global heat map link');
                addGlobalHeatMapLink();
            }
        }
    };

    function fixateNavBarToTop() {
        $('.container > header').css({'position': 'fixed', 'top': '0', 'height': '55px'});
        $('.container > .page').css({'top': '55px'});
    }

    function addGlobalHeatMapLink() {
        $('ul.global-nav a[href^="/segments/explore"]')
            .next()
            .append('<li><a href="http://labs.strava.com/heatmap">Global Heat Map</a></li>')
            .css('max-height', '400px');
    }

    return sh;
}(StravaHelper));