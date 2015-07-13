var StravaHelper = (function(sh) {

    var logger = new sh.Logger('ux.segmentleaderboard');

    sh.ux.segmentleaderboard = {
        changeType: function(leaderboardType) {
            logger.debug("initializing segment leaderboard behaviour");

            if (sh.prefs.enableCustomLeaderboardType) {
                changeCurrentSegmentLeaderboardType(leaderboardType);
            }
        }
    };

    /**
     * Switch the default filter of the segment leaderboards on activity pages.
     *
     * We're using a workaround here: the known way (find the details in the link
     * to the Stravistix Chrome extension) to switch the filter via the
     * `Strava.Labs.Activities.SegmentLeaderboardView` object doesn't work here,
     * because we've no access to the Strava object in this extension.
     *
     * An interval timer checks every 100 ms if the filter link is available after
     * a segment was activated and rendered. If the link was found the click event is
     * triggered and the timer is canceled.
     *
     * The click event on the filter link is only triggered once.
     *
     * @link https://github.com/thomaschampagne/stravistix/blob/develop/hook/extension/js/modifiers/DefaultLeaderboardFilterModifier.js#L19
     *
     * @param  {string} leaderboardType The data value of the filter to be set, e.g. 'my_results'
     * @return {void}
     */
    function changeCurrentSegmentLeaderboardType(leaderboardType) {
        if (!sh.util.isCurrentPage(['activities'])) {
            return;
        }

        logger.debug('changing leaderboard typ to: ' + leaderboardType);

        $(document).on("click", "table.segments tr", function() {
            var $segment = $(this);
            var timer = window.setInterval(
                function() {
                    if ($(".clickable[data-filter=" + leaderboardType + "]").length === 0) {
                        return;
                    }
                    $segment
                        .not(".strava-helper-clicked")
                        .addClass("strava-helper-clicked")
                        .find(".clickable[data-filter=" + leaderboardType + "]")
                        .click();
                    window.clearInterval(timer);
                },
                100
            );
        });
    }

    return sh;
}(StravaHelper));