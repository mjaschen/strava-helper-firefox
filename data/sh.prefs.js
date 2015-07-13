var StravaHelper = (function(sh) {

    var logger = new sh.Logger('prefs');

    sh.prefs = {};

    self.port.on('get-prefs', preferencesReceived);

    function preferencesReceived(prefs) {
        logger.debug("preferences received from browser");

        sh.prefs = prefs;
        sh.pipe.publish('prefs-received');
    }

    return sh;
}(StravaHelper));