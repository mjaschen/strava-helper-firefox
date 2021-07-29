strava_helper = (function (strava_helper) {

    strava_helper.kudos_all = {
        getKudosAllImage: function () {
            return '<span title="Give Kudos to all visible activities!"></span>'
        },

        giveKudosToAll: function () {
            var count = $('button.js-add-kudo').length
            $('button.js-add-kudo').trigger('click')
            strava_helper.kudos_all.showKudosCount(count, true)

            var timer = window.setTimeout(function () {
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
