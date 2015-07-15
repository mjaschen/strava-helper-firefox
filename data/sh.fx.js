var StravaHelper = (function(sh) {

    var defaultEffects = {
        'insert': 'fadeIn',
        'remove': 'fadeOut'
    };

    sh.fx = {
        insertAfter: function(content, target, _animation) {
            var $content = $(content);
            var $target = $(target);
            var animation = _animation;

            if (animation === undefined) {
                animation = defaultEffects.insert;
            }

            if (animationsEnabled()) {
                $content.addClass('animated ' + animation);
            }

            $content.insertAfter($target);
        },

        remove: function(element, _animation) {
            var $elem = $(element);
            var animation = _animation;

            if (! animationsEnabled()) {
                $elem.remove();
                return;
            }

            $elem.one('mozAnimationEnd animationend', function() {
                $elem.remove();
            });

            if (animation === undefined) {
                animation = defaultEffects.remove;
            }

            $elem.addClass('animated ' + animation);
        }
    };

    function animationsEnabled() {
        return sh.prefs.enableAnimations;
    }

    return sh;
}(StravaHelper));
