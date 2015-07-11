self.port.on('get-prefs', function(prefs) {

    Zepto(function($) {

        var mjaschen = mjaschen || {};
        mjaschen.strava = mjaschen.strava || {};

        mjaschen.strava = {

            prefs: prefs,

            init : function() {

                if (mjaschen.strava.prefs.addKudosButton) {
                    mjaschen.strava.createKudosToAllButton();
                    $(document).on("click", "#strava-helper-kudos-all-button", mjaschen.strava.giveKudosToAll);
                }

                if (mjaschen.strava.prefs.removeClutter) {
                    mjaschen.strava.removeClutter();
                }

                if (mjaschen.strava.prefs.addVeloViewerLinks) {
                    mjaschen.strava.addVeloViewerLink();
                    mjaschen.strava.addVeloViewerActivityLink();
                }

                if (mjaschen.strava.prefs.fixateNavBar) {
                    mjaschen.strava.fixUi();
                }

                if (mjaschen.strava.prefs.addGlobalHeatMapLink) {
                    mjaschen.strava.addGlobalHeatMapLink();
                }

                mjaschen.strava.changeCurrentSegmentLeaderboardType("my_results");
            },

            createKudosToAllButton : function() {
                if (mjaschen.strava.isPageValidForKudosButton()) {
                    $("<div/>", {
                        id: "strava-helper-kudos-all-button",
                        title: "Give Kudos to all visible items.",
                        text: "👍"
                    }).prependTo("body");
                }
            },

            giveKudosToAll : function() {
                $("button.js-add-kudo").trigger("click");
                mjaschen.strava.changeButtonText("✅")

                var timer = window.setTimeout(function() {
                    mjaschen.strava.changeButtonText("👍")
                }, 1000);
            },

            changeButtonText : function(text) {
                $("#strava-helper-kudos-all-button").text(text);
            },

            addVeloViewerLink : function() {
                var $link = $("<a/>", {
                    href: "http://veloviewer.com/",
                    text: "VeloViewer",
                    css: {
                        color: '#ff032e'
                    }
                })
                var $listItem = $("<li/>", {
                    class: "nav-link"
                });

                $listItem.append($link).appendTo("ul.global-nav");
            },

            addVeloViewerActivityLink : function() {

                try {
                    var activityId = mjaschen.strava.getActivityId();
                } catch (e) {
                    console.error(e);
                    return;
                }

                var $veloviewer = $("section.others-section div.flybys").clone();

                $veloviewer
                    .removeClass("flybys")
                    .addClass("veloviewer")
                $veloviewer
                    .find("div.labs-logo img")
                        .attr("src", "data:img/png;base64,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");
                $veloviewer
                    .find("a")
                        .attr("href", "http://veloviewer.com/activities/" + activityId.toString())
                        .text("View Activity");

                $("section.others-section").append($veloviewer);
            },

            getActivityId : function() {
                var regexp = /activities\/(\d+)/;
                var path = document.location.pathname;
                var match = path.match(regexp);

                if (match.length === 2) {
                    return match[1];
                }

                throw "Cannot extract activity ID from path: " + path;
            },

            isPageValidForKudosButton: function() {
                // test if we are in an iframe, i.e. Strava widget
                if (window.frames.length === 0 && parent.frames.length === 1) {
                    return false;
                }

                // test if we are on a page potentially containing kudos buttons
                var fragment = document.location.pathname.split('/')[1];
                var validPages = [ 'athletes', 'clubs', 'dashboard' ];

                if (validPages.indexOf(fragment) > -1) {
                    return true;
                }

                return false;
            },

            removeClutter: function() {
                mjaschen.strava.removeFindFriends();
                mjaschen.strava.removeUpcomingEvents();
                mjaschen.strava.removeDiscoverySuggestions();
                mjaschen.strava.removeFollowSuggestions();
                mjaschen.strava.removePromotionalFooter();
                mjaschen.strava.removeShopLink();
                mjaschen.strava.removeGetPremiumLink();
                mjaschen.strava.removeShareDropdown();
                mjaschen.strava.removeCreateTargetButton();
                mjaschen.strava.removeSharingButtons();
                mjaschen.strava.removePremiumContainer();
                mjaschen.strava.cleanupFlyByPage();
            },

            removeFindFriends: function() {
                $('#invite-your-friend-module').remove();
            },

            removeUpcomingEvents: function() {
                $('#upcoming-events').remove();
            },

            removeDiscoverySuggestions: function() {
                $('#discover-more').remove();
            },

            removeFollowSuggestions: function() {
                $('#suggested-follow-module').remove();
            },

            removePromotionalFooter: function() {
                $('.footer-promos').remove();
            },

            removeShopLink: function() {
                if (mjaschen.strava.isLoggedIn()) {
                    $('.global-nav li:last-child').remove();
                }
            },

            removeGetPremiumLink: function() {
                $('.user-nav > li.upgrade').remove();
            },

            removePremiumContainer : function() {
                $("#dorado-module").remove();
            },

            removeShareDropdown: function() {
                $('.drop-down-menu.share').remove();
            },

            removeCreateTargetButton: function() {
                $('.primary-stats > .upsell-sm').remove();
            },

            removeSharingButtons: function() {
                $('.sharing').remove();
            },

            cleanupFlyByPage: function() {
                // remove top sharing buttons
                $('.share').remove();

                // remove unnecessary containers
                $('#sidebar .labs-disclaimer').remove();
                $('#sidebar .info').remove();
            },

            isLoggedIn: function() {
                return $('.user-menu').length > 0;
            },

            fixUi: function() {
                // make top navigation fixed at top
                $('.container > header').css({'position': 'fixed', 'top': '0', 'height': '55px'});
                $('.container > .page').css({'top': '55px'});
            },

            addGlobalHeatMapLink: function() {
                // adds a link to the global heat map in the "Discover" top navigation dropdown menu
                $('.global-nav li:nth-child(4)').find('ul').append('<li><a href="http://labs.strava.com/heatmap">Global Heat Map</a></li>');
            },

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
            changeCurrentSegmentLeaderboardType : function(leaderboardType) {
                $("table.segments tr").on("click", function() {
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
        }

        mjaschen.strava.init();
    });
});
