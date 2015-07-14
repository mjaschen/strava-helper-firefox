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
        if (! isPageValidForKudosButton()) {
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
        var count = $("button.js-add-kudo").length;
        $("button.js-add-kudo").trigger("click");
        showKudosCount(count, true);

        var timer = window.setTimeout(function() {
            resetKudosButton();
        }, 1000);
    }

    function showKudosCount(count) {
        if (count === 0) {
            return;
        }
        $("#strava-helper-kudos-all-button")
            .text(count.toString() + "x")
            .addClass("strava-helper-kudos-all-button-result animated bounce");
        logger.debug("Kudos count: " + count.toString() + " items");
    }

    function resetKudosButton() {
        $("#strava-helper-kudos-all-button")
            .text("👍")
            .removeClass("strava-helper-kudos-all-button-result animated bounce");
        logger.debug("Resetted kudos button");
    }

    return sh;
}(StravaHelper));
