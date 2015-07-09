Zepto(function($) {

    var mjaschen = mjaschen || {};
    mjaschen.strava = mjaschen.strava || {};

    mjaschen.strava = {

        init : function() {
            mjaschen.strava.createKudosToAllButton();
            $(document).on("click", "#strava-helper-kudos-all-button", mjaschen.strava.giveKudosToAll);

            mjaschen.strava.removeClutter();
        },

        createKudosToAllButton : function() {
            $("<div/>", {
                id: "strava-helper-kudos-all-button",
                title: "Give Kudos to all visible items.",
                text: "👍"
            }).prependTo("body");
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

        removeShareDropdown: function() {
            $('.drop-down-menu.share').remove();
        },

        removeCreateTargetButton: function() {
            $('.primary-stats > .upsell-sm').remove();
        },

        removeSharingButtons: function() {
            $('.sharing').remove();
        },

        isLoggedIn: function() {
            return $('.user-menu').length > 0;
        }

    }

    mjaschen.strava.init();

});
