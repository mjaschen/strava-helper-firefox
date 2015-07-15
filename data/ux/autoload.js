var StravaHelper = (function(sh) {

    var logger = new sh.Logger('ux.autoload');

    var lastActivityId;

    sh.ux.autoload = {
        enable: function() {
            logger.debug("initializing autoload behaviour");

            if (!sh.util.isCurrentPage(['dashboard', 'clubs'])) {
                return;
            }

            if (sh.prefs.autoloadActivities) {
                clickMoreButtonAutomatically();
                lastActivityId = getLastActivityId();
            }
        }
    };

    sh.pipe.subscribe('feed-updated', function() {
        logger.debug('feed-update received');

        insertSeparator(lastActivityId);
        lastActivityId = getLastActivityId();
    });

    function clickMoreButtonAutomatically() {
        logger.debug('adding autoload functionality');

        var loadMoreButton;
        var timer;

        $(window).scroll(function() {
            if (timer) {
                window.clearTimeout(timer);
            }

            timer = window.setTimeout(function(){
                /*
                    Ensure handle for loading button is only valid when not loading
                 */
                loadMoreButton = $('a.load-feed.button:not(.loading-more)');
                if (loadMoreButton.length === 1 && sh.util.isElementInView(loadMoreButton)) {
                    logger.debug('executing autoload');
                    loadMoreButton.click();
                }
            }, 200);
        });
    }

    /**
     * There are different types of feed itens in the activity feed. They are not conform in their
     * structure, so finding the last activity feed item is done by finding the last feed-entry with
     * an anchor to an activity page.
     *
     * feed-entry item itself cannot be saved for later use because the feed gets re-rendered and the
     * reference is invalid.
     *
     * @return the activity id of the last feed item
     */
    function getLastActivityId() {
        return sh.util.getActivityIdFromUrl($('div.feed-entry a[href^="/activities"]').last().attr('href'));
    }

    /*
     * Same as in getLastActivityId. Get the last feed-entry by finding it by it's contained anchor.
     */
    function insertSeparator(activityId) {
        var feedEntry = $('a[href="/activities/' + activityId + '"]').closest('div[class~="feed-entry"]');
        var separator = $('<div class="sh-separator"></div>');

        sh.fx.add(separator, "zoomIn").insertAfter(feedEntry);
    }

    return sh;
}(StravaHelper));
