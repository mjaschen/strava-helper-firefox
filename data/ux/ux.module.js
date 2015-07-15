var StravaHelper = (function(sh) {

    var logger = new sh.Logger('ux');

    sh.ux = {
        init: function() {
            logger.debug("initializing ux additions");

            sh.ux.kudosbutton.add();
            sh.ux.autoload.enable();
            sh.ux.segmentleaderboard.changeType(sh.prefs.leaderboardType);
            sh.ux.veloviewer.addVeloViewerLinks();
        }
    };

    return sh;
}(StravaHelper));
