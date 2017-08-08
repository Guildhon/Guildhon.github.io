var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename')

var DEST = './dist/';
var IS_DEV = process.env.DEV || false;

// gulp.task('minify-css', function() {
//     if (IS_DEV) {
//         gulp.src('src/nprogress.css')
//             .pipe(rename('main.css'))
//             .pipe(gulp.dest(DEST));
//     } else {
//         gulp.src('src/nprogress.css')
//             .pipe(minifyCss())
//             .pipe(rename('main.css'))
//             .pipe(gulp.dest(DEST));
//     }
// });


gulp.task('concat', function() {
    if (IS_DEV) {
        gulp.src(['src/nprogress.js', 'src/index.js'])
            .pipe(concat('main.js'))
            .pipe(gulp.dest(DEST));

        gulp.src(['src/nprogress.css', 'src/custom.css'])
            .pipe(concat('main.css'))
            .pipe(gulp.dest(DEST))
    } else {
        gulp.src(['src/nprogress.js', 'src/index.js'])
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulp.dest(DEST));

        gulp.src(['src/nprogress.css', 'src/custom.css'])
            .pipe(concat('main.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest(DEST))
    }

});


gulp.task('build', ['concat']);

gulp.task('watch', ['build'], function() {
    gulp.watch('./src/**/*', ['build'])
});

gulp.task('default', ['watch'])