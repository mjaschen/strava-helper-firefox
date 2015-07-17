var StravaHelper = (function(sh) {

    var logger = new sh.Logger("main");
    var timer = sh.util.timer('main');

    sh.pipe.subscribe('prefs-received', function() {
        logger.debug('preferences received from module');
        init();
    });

    function init() {
        logger.debug('initializing Strava Helper');

        if (sh.util.isLoggedIn()) {
            sh.util.setUserLevel();
            sh.ui.init();
            sh.ux.init();
        }

        timer.stop();
    }

    return sh;
}(StravaHelper));
