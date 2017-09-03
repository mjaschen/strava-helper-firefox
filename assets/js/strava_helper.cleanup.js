var strava_helper = (function(strava_helper) {

    strava_helper.cleanup = {

        removeShopLink: function() {
            $("div.icon-nav.icon-shop").parent().parent("li").remove();
        },

        removeInviteSections: function() {
            $("#invite-your-friend-module").remove();
            $("div.invite-friends").remove();
            $(".upsell").remove();
            $("#challenge-sidebar-rewards").remove();
        },

        removeUpcomingEvents: function () {
            $("#upcoming-events").remove();
        },

        removeDoradoSection: function() {
            $("#dorado-module").remove();
        },

        removeDiscoverMoreSection: function () {
            $("#discover-more").remove();
        },

        removeNavbarPremiumLinks: function () {
            $("li.premium.opt-group").remove();
            $("li.upgrade", "ul.user-nav").remove();
        },

        moveRecentActivitiesToTop: function() {
            if (! strava_helper.util.isCurrentPage(["dashboard"])) {
                return;
            }

            var recentActivities = $(".js-channel-footer-left")
                                        .clone()
                                        .removeClass("spans-one-third")
                                        .addClass("section");

            recentActivities
                .find("h3")
                .removeClass("h4");

            recentActivities.insertAfter($("#progress-goals"));
        },

        removeClubJoinsFromFeed: function () {
            $(".feed-entry.min-view", ".feed").remove()
        },

        removePromosFromFeed: function () {
            $(".promo", ".feed").remove();
        },

        init: function() {
            strava_helper.cleanup.moveRecentActivitiesToTop();
            strava_helper.cleanup.removeDiscoverMoreSection();
            strava_helper.cleanup.removeDoradoSection();
            strava_helper.cleanup.removeInviteSections();
            strava_helper.cleanup.removeUpcomingEvents();
            strava_helper.cleanup.removeShopLink();
            strava_helper.cleanup.removeClubJoinsFromFeed();
            strava_helper.cleanup.removePromosFromFeed();
            strava_helper.cleanup.removeNavbarPremiumLinks();
        }
    };

    strava_helper.cleanup.init();

    return strava_helper;

}(strava_helper));
