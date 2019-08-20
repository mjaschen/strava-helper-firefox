/* global $ */

strava_helper = (function (strava_helper, document) {

    strava_helper.cleanup = {

        removeFollowSuggestions: function () {
            $('#suggested-follows').remove()
        },

        removeUpsellLinks: function () {
            $('.premium.opt-group').remove()
            $('.upsell').remove()
            $('li.upgrade').remove()
        },

        removeClubJoinsFromFeed: function () {
            $('.feed-entry.card.club', '.feed').remove()
        },

        removeZwiftActivitiesFromFeed: function () {
            $("div.sponsor", "div.activity").parents("div.activity").remove();
        },

        removePromosFromFeed: function () {
            $('.promo.feed-entry.card', '.feed').remove()
            $('#explore-strava').remove()
        },

        removeChallengesFromFeed: function () {
            $('.challenge.feed-entry.card', '.feed').remove()
            $('#your-challenges').remove()
            $('li a[href^="/challenges"]', '.global-nav').parent().remove()
        },

        removeCommutes: function () {
            $('.activity-map-tag:contains(\'Commute\')', '.feed').parents('div.activity').remove()
        },

        removeGoals: function () {
            $('.performance-goal', '.feed').remove()
        },

        watchFeedAutoScroll: function () {
            var observerTarget = null

            if (strava_helper.util.isCurrentPage(['dashboard', 'clubs'])) {
                observerTarget = document.querySelector('.feed-container .feed')
            }

            if (strava_helper.util.isCurrentPage(['athletes'])) {
                observerTarget = document.querySelector('#activity-log')
            }

            if (observerTarget === null) {
                return
            }

            var observerConfig = { childList: true }

            var observer = new MutationObserver(
                function (mutations, observer) {
                    mutations.forEach(
                        function (mutation) {
                            if (mutation.type === 'childList') {
                                strava_helper.cleanup.cleanup()
                            }
                        }
                    )
                }
            )

            observer.observe(observerTarget, observerConfig)
        },

        cleanup: function () {
            chrome.storage.sync.get(
                null,
                function (items) {
                    if (items.remove_upsell_links !== false) {
                        strava_helper.cleanup.removeUpsellLinks()
                    }
                    if (items.remove_follow_suggestions !== false) {
                        strava_helper.cleanup.removeFollowSuggestions()
                    }
                    if (items.remove_club_joins_from_feed !== false) {
                        strava_helper.cleanup.removeClubJoinsFromFeed()
                    }
                    if (items.remove_zwift_activities_from_feed !== false) {
                        strava_helper.cleanup.removeZwiftActivitiesFromFeed()
                    }
                    if (items.remove_commutes_from_feed !== false) {
                        strava_helper.cleanup.removeCommutes()
                    }
                    if (items.remove_goals_from_feed !== false) {
                        strava_helper.cleanup.removeGoals()
                    }
                    if (items.remove_promos_from_feed !== false) {
                        strava_helper.cleanup.removePromosFromFeed()
                    }
                    if (items.remove_challenges_from_feed !== false) {
                        strava_helper.cleanup.removeChallengesFromFeed()
                    }
                }
            )
        },

        init: function () {
            strava_helper.cleanup.cleanup()
            strava_helper.cleanup.watchFeedAutoScroll()
        }
        }

    strava_helper.cleanup.init()

    return strava_helper

}(strava_helper, document))
