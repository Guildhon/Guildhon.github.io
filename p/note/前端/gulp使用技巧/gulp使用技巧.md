My Note
--------
> gulp使用技巧

[gulp官网](http://www.gulpjs.com.cn/docs/getting-started/)
[查看npm包](https://www.npmjs.com/)

#### 常用gulp插件
编译less gulp-less

合并文件 gulp-concat

压缩CSS文件 gulp-clean-css

编译ES6代码，ES6转ES5 gulp-babel

压缩javascript文件 gulp-uglify

文件重命名 gulp-rename

压缩图片 gulp-imagemin

文件名添加md5后缀 gulp-rev

#### 与Browser-Sync配合使用
当前HTML文件发生改变时，浏览器自动刷新
```
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// 静态服务器
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: 'index.html'    // 入口文件
        },
		port: 1212   // 端口号
    });
    gulp.watch("*.html").on('change', reload);  // 监听文件改变自动刷新
});
```
编译sass后重新刷新
```
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);    // 监听sass文件改变
    gulp.watch("app/*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(reload({stream: true}));    //重新刷新
});

gulp.task('default', ['serve']);
```