(function (document, chrome) {

    var options = {

        settings : {
            remove_upsell_links: {
                type: "checkbox",
                default: true,
            },
            remove_follow_suggestions: {
                type: "checkbox",
                default: true,
            },
            remove_club_joins_from_feed: {
                type: "checkbox",
                default: true,
            },
            remove_zwift_activities_from_feed: {
                type: "checkbox",
                default: true,
            },
            remove_promos_from_feed: {
                type: "checkbox",
                default: true,
            },
            remove_challenges_from_feed: {
                type: "checkbox",
                default: true,
            },
            add_veloviewer_links: {
                type: "checkbox",
                default: true,
            }
        },

        save_options: function () {
            var data = {};
            for (let setting in options.settings) {
                data[setting] = document.getElementById(setting).checked;
            }
            chrome.storage.sync.set(
                data,
                function () {
                    var status = document.getElementById("status");
                    status.textContent = 'Options saved.';
                    setTimeout(
                        function () {
                            status.textContent = '';
                        },
                        750
                    );
                }
            );
        },

        get_default_settings: function () {
            var data = {};
            for (let setting in options.settings) {
                data[setting] = options.settings[setting].default;
            }
            return data;
        },

        restore_options: function () {
            chrome.storage.sync.get(
                options.get_default_settings(),
                function (items) {
                    for (let setting in items) {
                        document.getElementById(setting).checked = items[setting];
                    }
                }
            );
        },

        init: function () {
            document.addEventListener("DOMContentLoaded", options.restore_options);
            document.getElementById("save").addEventListener("click", options.save_options);
        }

    };

    options.init();

}(document, chrome));
