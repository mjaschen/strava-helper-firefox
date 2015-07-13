var StravaHelper = (function(sh) {

    var logger = new sh.Logger('ux.autoload');

    sh.ux.autoload = {
        enable: function() {
            logger.debug("initializing autoload behaviour");

            if (sh.prefs.autoloadActivities) {
                clickMoreButtonAutomatically();
            }
        }
    };

    function clickMoreButtonAutomatically() {
        if (!sh.util.isCurrentPage(['dashboard', 'clubs'])) {
            return;
        }

        logger.debug('adding autoload functionality');

        var loadMoreButton;
        var timer;

        $(window).scroll(function() {
            if (timer) {
                window.clearTimeout(timer);
            }

            timer = window.setTimeout(function(){
                loadMoreButton = $('a.load-feed.button');
                if (loadMoreButton.length === 1 && sh.util.isElementInView(loadMoreButton)) {
                    logger.debug('executing autoload');
                    loadMoreButton.click();
                }
            }, 200);
        });
    }

    return sh;
}(StravaHelper));