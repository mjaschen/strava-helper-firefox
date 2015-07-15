var StravaHelper = (function(sh) {

    var defaultAnimation = "shake";

    sh.fx = {
        /*
         * Adds an effect to an element if animations are enabled.
         *
         * @param element the element to apply the effect on
         * @param _animation animation identifier to use
         * @param callback function to execute when the animation has ended
         *
         * @return element decorated with effect
         */
        add: function(element, _animation, callback) {
            var $elem = $(element);
            var animation = _animation;

            if (animation === undefined) {
                animation = defaultAnimation;
            }

            if (! animationsEnabled()) {
                return element;
            }

            if (callback) {
                $elem.one('mozAnimationEnd animationend', callback);
            }

            $elem.addClass('animated ' + animation);

            return $elem;
        }
    };

    function animationsEnabled() {
        return sh.prefs.enableAnimations;
    }

    return sh;
}(StravaHelper));
