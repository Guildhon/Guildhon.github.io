;(function($, NProgress) {
    'use strict';

    $(window).on('before-load-main-page', function(evt, data) {
        NProgress.start();
    });

    $(window).on('loaded-main-page', function() {
        NProgress.done();
    });


})(Zepto, NProgress);