strava_helper = (function (strava_helper) {

    strava_helper.util = {

        isCurrentPage: function (fragments) {
            var fragment = document.location.pathname.split('/')[1]

            return fragments.indexOf(fragment) > -1
        },

        isActivityPage: function () {
            return $('.activity-summary-container').length === 1
        },

        getActivityId: function () {
            if (!strava_helper.util.isActivityPage()) {
                return null
            }

            var matches = document.URL.match(/activities\/(\d+)/)

            if (matches.length === 2) {
                return matches[1]
            }

            return null
        },

        getExtensionURL: function (url) {
            if (typeof chrome === 'object') {
                return chrome.extension.getURL(url)
            }

            return browser.extension.getURL(url)
        },

        init: function () {
        }
    }

    strava_helper.util.init()

    return strava_helper

}(strava_helper))
