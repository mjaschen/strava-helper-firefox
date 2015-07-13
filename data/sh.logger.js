var StravaHelper = (function(sh) {
    var context = '';

    sh.Logger = function(context) {
        this.context = context;
    };

    sh.Logger.prototype.debug = function(message) {
        if (sh.config.logging.debug) console.log('[' + this.context + '] - ' + message);
    };

    sh.Logger.prototype.error = function(message) {
        console.error('[' + this.context + '] - ' + message);
    };

    return sh;
}(StravaHelper));