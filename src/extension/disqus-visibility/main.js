;(function($) {
    'use strict';
    //白名单 ，在名单下的均不会显示评论
    var white_list = [
        '', //首页
        'home.md',
        'about.md',
        'README.md'
    ]

    var isIndexPage = function(){
        var search = window.location.search;
        //判断index page的规则
        //含有index.md or index.markdown的均认为是index page
        if (/index\./gi.test(search) && (search.endsWith('md') || search.endsWith('markdown'))){
            return true;
        }
        return false;
    };

    var isInWhiteList = function(){
        var search = window.location.search;
        for (var index in white_list){
            // new RegExp('about.md').test(window.location.search)
            if ((white_list[index] != '' && new RegExp(white_list[index], 'ig').test(search))
                || search == white_list[index]){
                return true;
            }
        }
        return false;
    }

    $(window).on('loaded-sidebar-page', function() {
       // console.log('loaded-sidebar-page')
    });
    $(window).on('loaded-main-page', function() {
         if (isIndexPage() || isInWhiteList()){
            $('#disqus_thread').css('display','none');
        }else{
            $('#disqus_thread').css('display','block');
        }
    });
    $(window).on('loaded-main-page-footer', function() {
        // console.log('loaded-main-page-footer')
    });

    $(window).on('page-not-found', function(evt, data){
        // console.log('page-not-found')
    });

    $(window).on('before-load-sidebar-page', function(evt, data){
        // console.log('before-load-sidebar-page')
    });
    $(window).on('before-load-main-page', function(evt, data){
        // console.log('before-load-main-page')
    });
    $(window).on('before-load-main-page-footer', function(evt, data){
        // console.log('before-load-main-page-footer')
    });
})(Zepto);
