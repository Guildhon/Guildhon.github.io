/**
 * blog.js - the core of silentor
 * author: Jayin Ton
 * version: 1.5.4
 * License:Apache 2.0
 */
(function($) {
    'use strict';
    var app_name = '';
    var blog_base = '';
    var img_root = 'img';
    var markdown_root = 'p';
    //当前请求的markdown文件
    var cur_md_path = '';
    /*是否是http:// 如果是，那么这是资源文件,如果否，说明这是要处理的a标签*/
    function isAbsolute(url) {
            return url.indexOf('//') !== -1;
        }
        /*获得相对目录*/
    function getPageBase(url) {
            return url.slice(0, url.lastIndexOf('/') + 1);
        }
        /*判断加载的路径是否是markdown文件*/
    function isMarkdownFile(url) {
            return url.toLowerCase().indexOf('.md') !== -1 || url.toLowerCase().indexOf('.markdown') !== -1;
        }
        //获得markdown的文件名,用作标题
    function getMarkdownTitle(file_path) {
            if (!isMarkdownFile(file_path)) {
                return app_name;
            } else {
                var real_file_name = file_path;
                if (hasFolder(file_path)) {
                    real_file_name = file_path.slice(file_path.lastIndexOf('/') + 1, file_path.length);
                }
                return real_file_name.split('.')[0];
            }
        }
    //Event Hook 
    function hook(hook_name, data){
        $(window).trigger(hook_name, data);
    }
        // resolve 路径
    function resolvePath(from, to) {
            if (from[from.length - 1] == '/') {
                from = from.substring(0, from.length - 1);
            }
            var froms = from.split('/');
            var tos = to.split('/');
            if (tos[0] == '.') {
                tos.splice(0, 1);
            } else if (tos[0] == '..') {
                froms.splice(froms.length - 1, 1);
                tos.splice(0, 1);
            } else if (tos[0].indexOf('http') != -1 || tos[0].indexOf('https') != -1) {
                return to;
            } else {
                return froms.join('/') + "/" + tos.join('/');
            }
            return resolvePath(froms.join('/'), tos.join('/'));
        }
        /**
         * @param selector 选择器
         * @param  file_path 文件路径
         * @param  isSidebar 是否是左边导航栏
         * @param  baseUrl 基准url
         */
    function load(selector, file_path, isSidebar, baseUrl) {
        var baseUrl = baseUrl || blog_base;
        var isSidebar = isSidebar || false;

        var p_url = baseUrl + file_path;
        
        $.ajax({
            type: 'GET',
            url: p_url,
            success: function(data){
                marked.setOptions({
                    highlight: function(code) {
                        return hljs.highlightAuto(code).value;
                    }
                });
                var _selector = $(selector);
                _selector.html(marked(data));

                //处理所有href
                _selector.find('[href]').each(function() {
                    var $element = $(this);
                    var url = $element.attr('href');

                    if (isAbsolute(url)) {
                        $element.attr('target', '_blank');
                    }

                    // sidebar
                    if (isSidebar && isMarkdownFile(url)) {
                        $element.attr('href', '?p=' + url);

                    }

                    //main page
                    if (!isAbsolute(url) && !isSidebar && isMarkdownFile(url)) {
                        var new_url = getPageBase(cur_md_path);
                        //上一级目录
                        if (url.indexOf('../') == 0) {
                            //处理相对路径
                            new_url = resolvePath(getPageBase(cur_md_path), url);
                        } else if (url.indexOf('__P__') == 0) {
                            //文章根目录`p/`下
                            new_url = url.replace('__P__/', '');
                        } else {
                            //当前目录
                            new_url = new_url + url.replace('./', '');
                        }
                        $element.attr('href', '?p=' + new_url);
                    }
                });
                //main-page
                if (!isSidebar) {
                    //change title
                    var mainTitle = $('#main-page').find('h1, h2, h3, h4, h5, h6').first().text();
                    $('title').text(mainTitle);

                    //图片位置
                    $.each(_selector.find('img'), function(index, item) {
                        var alt = $(item).attr('alt') || '';
                        if (alt.indexOf('|left') != -1) {
                            $(item).addClass('img-left');
                        } else if (alt.indexOf('|right') != -1) {
                            $(item).addClass('img-right');
                        } else {
                            $(item).addClass('img-center');
                        }
                    });
                }
                //sidebar
                if (isSidebar) {
                    //round avatar
                    _selector.find('img').first().addClass('avatar');
                    //add animation in item
                    $.each(_selector.find('li'), function(index, item) {
                        $(item).addClass('sidebar-item');
                    });
                }
                //处理图片链接
                $.each(_selector.find('img'), function(index, item) {
                    var $e = $(item);
                    if ($e.attr('src').indexOf('__IMG__') == 0) {
                        $e.attr('src', $e.attr('src').replace('__IMG__', img_root));
                    } else {
                        //适配相对路径
                        var path = resolvePath(getPageBase(p_url), $e.attr('src'));
                        $e.attr('src', path);
                    }
                });

                if (selector == '#sidebar-page'){
                    hook('loaded-sidebar-page');
                }else if (selector == '#main-page'){
                    hook('loaded-main-page');
                }else if (selector == '#main-page-footer'){
                    hook('loaded-main-page-footer')
                }
            },
            error:function(err) {
                if (err.status === 404) {
                    if (file_path === 'footer.md') {
                        console.log('没有找到footer.md! 建议在p/目录下建立footer.md 文件来添加底部信息！');
                        return;
                    }
                    load('#main-page', '404.md', false, '/' + app_name + '/');
                    hook('page-not-found', {
                        selector: selector,
                        path: file_path
                    })
                }
            }
        })
    }

    function read_config(callback) {
        $.ajax({
            method: 'GET',
            url: 'config.json',
            success: function(data) {
                app_name = data.app_name || app_name;
                img_root = data.img_root || img_root;
                var description = data.description || "";

                markdown_root = data.markdown_root || markdown_root;
                blog_base = '/' + app_name + '/' + markdown_root + '/';

                $('meta[name=description]').first().attr('content', description);
                callback();
            },
            error: function(err) {
                alert('读取配置有误');
            }
        })
    }


    function urlparser(url) {
      var a = document.createElement('a');
      a.href = url;
      
      var search = function(search) {
        if(!search) return {};
        
        var ret = {};
        search = search.slice(1).split('&');
        for(var i = 0, arr; i < search.length; i++) {
          arr = search[i].split('=');
          var key = arr[0], value = arr[1];
          if(/\[\]$/.test(key)) {
            ret[key] = ret[key] || [];
            ret[key].push(value);
          } else {
            ret[key] = value;
          }
        }
        return ret;
      };
      
      return {
        protocol: a.protocol,
        host: a.host,
        hostname: a.hostname,
        pathname: a.pathname,
        search: search(a.search),
        hash: a.hash
      }
    };

    function main() {
        read_config(function() {
            //加载侧边菜单栏
            hook('before-load-sidebar-page');
            load('#sidebar-page', 'sidebar.md', true);
            //加载内容页页脚
            hook('before-load-main-page-footer');
            load('#main-page-footer', 'footer.md');
            //加载主内容页
            var urlobject = urlparser(window.location.href);
            cur_md_path = urlobject.search['p'] || '';
            //部分服务器会在后面追加'/',例如：?a/b/cxx.md/
            if (cur_md_path.charAt(cur_md_path.length - 1) === '/') {
                cur_md_path = cur_md_path.slice(0, location.search.length - 2);
            }
            if (cur_md_path === '' || !isMarkdownFile(cur_md_path)) {
                hook('before-load-main-page');
                load('#main-page', 'home.md');
            } else {
                hook('before-load-main-page');
                load('#main-page', cur_md_path);
            }
        });
    }

    main();

})(Zepto);
