var StravaHelper = (function(sh) {

    var logger = new sh.Logger('ui');

    sh.ui = {
        init: function() {
            logger.debug("initializing ui fixes");

            sh.ui.cleanup.cleanAll();
            sh.ui.navbar.fixate();
            sh.ui.navbar.addGlobalHeatMapLink();
        }
    };

    return sh;
}(StravaHelper));