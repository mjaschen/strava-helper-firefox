var StravaHelper = (function(sh) {

    var logger = new sh.Logger("ui.cleanup");

    sh.ui.cleanup = {
        cleanAll: function() {
            logger.debug("applying ui fixes");

            moveRecentActivitiesToTop();

            if (sh.prefs.removeClutter) {
                cleanupFlyByPage();
                removeFindFriends();
                removeUpcomingEvents();
                removeDiscoverySuggestions();
                removeFollowSuggestions();
                removePromotionalFooter();
                removeShopLink();
                removeGetPremiumLink();
                removePremiumContainer();
                removeTrophyPremiumContainer();
                removeShareDropdown();
                removeCreateTargetButton();
                removeSharingButtons();
                removeTrophyTabFromProfilePage();
            }

            if (sh.prefs.removeConsecutiveAvatarsInFeed) {
                watchFeedAutoScroll();
                removeConsecutiveAvatarsInFeed();
            }

            if (sh.prefs.changeDefaultUploadToFile) {
                changeUploadMenuItemToFileUpload();
            }
        }
    };

    function moveRecentActivitiesToTop() {
        if (!sh.util.isCurrentPage(["dashboard"])) {
            return;
        }

        logger.debug("moving recent activities to top");

        var recentActivities = $(".js-channel-footer-left")
                                    .clone()
                                    .removeClass("spans-one-third")
                                    .addClass("section");

        recentActivities
            .find("h3")
            .removeClass("h4");

        recentActivities.insertAfter($("#progress-goals"));
    }

    function cleanupFlyByPage() {
        if (!sh.util.isCurrentPage["flyby"]) {
            return;
        }

        logger.debug("flyby: removing social media buttons");
        $(".share").remove();

        logger.debug("flyby: removing unnecessary containers");
        $("#sidebar .labs-disclaimer").remove();
        $("#sidebar .info").remove();
    }

    function removeFindFriends() {
        $("#invite-your-friend-module").remove();
    }

    function removeUpcomingEvents() {
        $("#upcoming-events").remove();
    }

    function removeDiscoverySuggestions() {
        $("#discover-more").remove();
    }

    function removeFollowSuggestions() {
        $("#suggested-follow-module").remove();
    }

    function removePromotionalFooter() {
        $(".footer-promos").remove();
    }

    function removeShopLink() {
        $('ul.global-nav a[href^="/shop"]').parent().remove();
    }

    function removeGetPremiumLink() {
        $(".user-nav > li.upgrade").remove();
    }

    function removePremiumContainer() {
        $("#dorado-module").remove();
    }

    function removeTrophyPremiumContainer() {
        $("ul.list-trophies li.upsell").remove();
        $("#trophy-case div.upsell").remove();
    }

    function removeShareDropdown() {
        $(".share").remove();
    }

    function removeCreateTargetButton() {
        $(".primary-stats > .upsell-sm").remove();
    }

    function removeSharingButtons() {
        $(".sharing").remove();
    }

    function watchFeedAutoScroll() {
        logger.debug("setting up observer for activity feed changes");
        var observerTarget = null;

        if (sh.util.isCurrentPage(['dashboard', 'clubs'])) {
            observerTarget = document.querySelector('div.feed-container');
        }

        if (sh.util.isCurrentPage(['athletes'])) {
            observerTarget = document.querySelector('div#interval-rides');
        }

        if (observerTarget === null) {
            logger.debug("no observable element found");
            return false;
        }

        var observerConfig = { childList: true };
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "childList") {
                    logger.debug("detected change in feed-container");
                    removeConsecutiveAvatarsInFeed();
                    if (sh.prefs.removeClutter) {
                        removeShareDropdown();
                    }
                }
            });

            sh.pipe.publish('feed-updated');
        });

        observer.observe(observerTarget, observerConfig);
    }

    function removeConsecutiveAvatarsInFeed() {
        var lastAthleteId;
        $("div.feed-entry a.avatar-md").each(function(idx, element) {
            var $elem = $(element);
            try {
                var currentAthleteId = sh.util.getAthleteIdFromUrl($elem.attr("href"));
            } catch (e) {
                logger.error(e);
                return;
            }

            if (lastAthleteId === currentAthleteId) {
                logger.debug("removing duplicate avatar image for athlete: " + currentAthleteId);
                $elem.siblings(".app-icon").css("margin-top", "0");

                sh.fx.add($elem, "zoomOut", function() {
                    $elem.remove();
                });
            }

            lastAthleteId = currentAthleteId;
        });
    }

    function changeUploadMenuItemToFileUpload() {
        logger.debug('changing upload link to file upload');
        $('span.upload-activity').parent().attr('href', '/upload/select');
        $('a.new-upload-button').attr('href', '/upload/select');
    }

    function removeTrophyTabFromProfilePage() {
        if (! sh.util.isCurrentPage(['athletes'])) {
            return;
        }

        if (sh.util.isUserPremium()) {
            return;
        }

        $('li a[href$="trophy-case"]').remove();
    }

    return sh;
}(StravaHelper));
