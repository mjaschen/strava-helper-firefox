Zepto(function($) {

    var mjaschen = mjaschen || {};
    mjaschen.strava = mjaschen.strava || {};

    mjaschen.strava = {

        init : function() {
            mjaschen.strava.createKudosToAllButton();
            $(document).on("click", "#strava-helper-kudos-all-button", mjaschen.strava.giveKudosToAll);

            mjaschen.strava.fixUi();
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

        fixUi: function() {
            // make top navigation fixed at top
            $('.container > header').css({'position': 'fixed', 'top': '0', 'height': '55px'});
            $('.container > .page').css({'top': '55px'});
        },

    }

    mjaschen.strava.init();

});
