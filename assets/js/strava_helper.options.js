(function (document, chrome) {

    var options = {

        settings: {
            remove_upsell_links: {
                type: 'checkbox',
                default: true
            },
            remove_follow_suggestions: {
                type: 'checkbox',
                default: true
            },
            remove_club_joins_from_feed: {
                type: 'checkbox',
                default: true
            },
            remove_zwift_activities_from_feed: {
                type: 'checkbox',
                default: true
            },
            remove_commutes_from_feed: {
                type: 'checkbox',
                default: false
            },
            remove_goals_from_feed: {
                type: 'checkbox',
                default: true
            },
            remove_promos_from_feed: {
                type: 'checkbox',
                default: true
            },
            remove_challenges_from_feed: {
                type: 'checkbox',
                default: true
            },
            add_veloviewer_links: {
                type: 'checkbox',
                default: true
            }
        },

        save_options: function () {
            var data = {}
            for (let setting in options.settings) {
                if (!options.settings.hasOwnProperty(setting)) {
                    continue
                }
                if (options.settings[setting].type === 'checkbox') {
                    data[setting] = document.getElementById(setting).checked
                }
                if (options.settings[setting].type === 'text') {
                    data[setting] = document.getElementById(setting).value
                }
            }
            chrome.storage.sync.set(
                data,
                function () {
                    var status = document.getElementById('status')
                    status.textContent = 'Options saved.'
                    setTimeout(
                        function () {
                            status.textContent = ''
                        },
                        750
                    )
                }
            )
        },

        get_default_settings: function () {
            var data = {}
            for (let setting in options.settings) {
                data[setting] = options.settings[setting].default
            }
            return data
        },

        restore_options: function () {
            chrome.storage.sync.get(
                options.get_default_settings(),
                function (items) {
                    for (let setting in items) {
                        if (options.settings[setting].type === 'checkbox') {
                            document.getElementById(setting).checked = items[setting]
                        }
                        if (options.settings[setting].type === 'text') {
                            document.getElementById(setting).value = items[setting]
                        }
                    }
                }
            )
        },

        init: function () {
            document.addEventListener('DOMContentLoaded', options.restore_options)
            document.getElementById('save').addEventListener('click', options.save_options)
        }

    }

    options.init()

}(document, chrome))
