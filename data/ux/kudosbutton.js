var StravaHelper = (function(sh) {

    var logger = new sh.Logger('ux.kudosbutton');

    sh.ux.kudosbutton = {
        add: function() {
            logger.debug("initializing kudos button module");

            if (sh.prefs.addKudosButton) {
                createKudosToAllButton();
            }
        }
    };

    function createKudosToAllButton() {
        if (!isPageValidForKudosButton()) {
            logger.debug('page not valid for kudos button');
            return;
        }

        logger.debug('adding kudosbutton');
        $("<div/>", {
            id: "strava-helper-kudos-all-button",
            title: "Give Kudos to all visible items.",
            text: "👍"
        }).prependTo("body");

        $(document).on("click", "#strava-helper-kudos-all-button", giveKudosToAll);
    }

    function isPageValidForKudosButton() {
        if (sh.util.isIFrame()) {
            return false;
        }

        if (sh.util.isCurrentPage([ 'athletes', 'clubs', 'dashboard' ])) {
            return true;
        }
    }

    function giveKudosToAll() {
        logger.debug('giving kudos to all');
        $("button.js-add-kudo").trigger("click");
        changeButtonText("✅")

        var timer = window.setTimeout(function() {
            changeButtonText("👍")
        }, 1000);
    }

    function changeButtonText(text) {
        $("#strava-helper-kudos-all-button").text(text);
    }

    return sh;
}(StravaHelper));