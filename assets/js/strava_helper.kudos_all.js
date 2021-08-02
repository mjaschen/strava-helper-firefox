strava_helper = (function (strava_helper) {

    strava_helper.kudos_all = {
        getKudosAllImage: function () {
            return '<span title="Give Kudos to all visible activities!"></span>'
        },

        giveKudosToAll: function () {
            let kudos_count = 0

            // search for all "Kudos" buttons on the current page ...
            $('button[data-testid="kudos_button"]').each(function(index, element) {
                // ... skip if Kudos where already given to an activity
                if ($('svg[data-testid="unfilled_kudos"]', $(element)).length === 0) {
                    return
                }

                // ... and skip own activities
                let $container = $(element).parents('div.react-card-container').first()
                // own activity which is hidden ("Only you can view this activity. It won't appear on segment leaderboards and may not count toward some challenges")
                if ($('div[data-testid="visibility_section"]', $container).length > 0) {
                    return
                }
                // own activity which is public (share dropdown exists)
                if ($('div[data-testid="entry_actions_container"]', $container).length > 0) {
                    return
                }

                $(element).trigger('click')
                kudos_count++
            })

            strava_helper.kudos_all.showKudosCount(kudos_count, true)

            window.setTimeout(function () {
                strava_helper.kudos_all.resetKudosButton()
            }, 5000)
        },

        showKudosCount: function (count) {
            if (count === 0) {
                return
            }
            $('#strava-helper-kudos-all-button')
                .text(count.toString() + 'x')
                .addClass('strava-helper-kudos-all-button-result animated bounce')
        },

        resetKudosButton: function () {
            $('#strava-helper-kudos-all-button')
                .html(strava_helper.kudos_all.getKudosAllImage())
                .removeClass('strava-helper-kudos-all-button-result animated bounce')
        },

        init: function () {
            $('<li/>').append(
                $(
                    '<div/>',
                    {
                        id: 'strava-helper-kudos-all-button',
                        title: 'Give Kudos to all visible items.',
                        html: strava_helper.kudos_all.getKudosAllImage()
                    }
                )
            ).appendTo('.user-nav')

            $('#strava-helper-kudos-all-button').on('click', strava_helper.kudos_all.giveKudosToAll)
        }
    }

    strava_helper.kudos_all.init()

    return strava_helper

}(strava_helper))
