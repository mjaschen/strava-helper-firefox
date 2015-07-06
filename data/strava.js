jQuery(function($) {
    var $kudosAllButton = $("<div></div>")
        .prop("id", "strava-helper-kudos-all-button")
        .attr("title", "Give Kudos to all visible items.")
        .text("👍");

    $("body").prepend($kudosAllButton);

    $(document).on("click", "#strava-helper-kudos-all-button", function(event) {
        $("button.js-add-kudo").click();

        var self = $(this);
        self.text("✅");

        var timer = window.setTimeout(function() {
            self.text("👍");
        }, 1000);
    });
});
