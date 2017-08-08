;(function($) {
    'use strict';
    $(window).on('loaded-sidebar-page', function() {
        var $sidebar = $('.sidebar');
        $sidebar.css('background-image', "url('https://unsplash.it/{w}/{h}/?random&gravity=center')".replace('{w}', $sidebar.width()).replace('{h}', $sidebar.height()));
    });
})(Zepto);