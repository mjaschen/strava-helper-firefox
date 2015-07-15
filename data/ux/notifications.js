var StravaHelper = (function(sh) {

    var logger = new sh.Logger('ux.notifications');

    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "timeOut": "5000",
        "extendedTimeOut": "2000",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    sh.ux.notifications = {
        info: function(message) {

            if (! sh.prefs.enableNotifications) {
                return;
            }

            displayInfoNotification(message);
        }
    };

    function displayInfoNotification(message) {
        toastr.info(message);
    }

    return sh;
}(StravaHelper));
