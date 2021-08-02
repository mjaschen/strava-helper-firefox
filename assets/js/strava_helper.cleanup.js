/* global $ */

strava_helper = (function (strava_helper, document) {

    strava_helper.cleanup = {

        removeFollowSuggestions: function () {
            $('#suggested-follows').remove()
        },

        removeUpsellLinks: function () {
            [
                '.premium.opt-group',
                '.upsell',
                '.relative-effort-upsell',
                '.matched-activities-upsell',
                '#segments-upsell',
                'li.upgrade',
            ].forEach(function (selector) {
                $(selector).remove()
            })
        },

        removeClubJoinsFromFeed: function () {
            $('.feed-entry.card.club', '.feed').remove()
        },

        removeZwiftActivitiesFromFeed: function () {
            $('div.enhanced-tag', 'div.activity')
                .filter(
                    (idx, elem) => {
                        return null !== $(elem).text().match(/zwift/i)
                    }
                )
                .parents('div.activity')
                .remove()
        },

        removePelotonActivitiesFromFeed: function () {
            $('div.enhanced-tag', 'div.activity')
                .filter(
                    (idx, elem) => {
                        return null !== $(elem).text().match(/peloton/i)
                    }
                )
                .parents('div.activity')
                .remove()
        },

        removeWahooActivitiesFromFeed: function () {
            $('div.sponsor', 'div.activity')
                .filter(function () {
                    for (let image of $('img', $(this))) {
                        if ($(image).attr('alt').match(/wahoo elemnt/i)) {
                            return true
                        }
                    }
                    return false
                })
                .parents('div.activity')
                .remove()
        },

        removePromosFromFeed: function () {
            $('.promo.feed-entry.card', '.feed').remove()
            $('#explore-strava').remove()
        },

        removeChallengesFromFeed: function () {
            $('div[data-react-class="ChallengeJoin"]', '.feed').parent().remove();
            $('#your-challenges').remove()
            $('.achievement-celebration').parents('.entry-media').remove()
        },

        removeCommutes: function () {
            $('.activity-map-tag:contains(Commute),.activity-map-tag:contains(Pendeln)', '.feed')
                .parents('div.activity')
                .remove()
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
                    if (items.remove_peloton_activities_from_feed !== false) {
                        strava_helper.cleanup.removePelotonActivitiesFromFeed()
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
