var gulp = require('gulp')
var minifyCss = require('gulp-minify-css')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var header = require('gulp-header')
var gulpif = require('gulp-if')
var path = require('path')

const DEST = 'vendor'
const IS_DEV = process.env.DEV || false

var pkg = require('./package.json')
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n')

gulp.task('copy', function () {
  gulp.src('src/**/*.+(md|gif|png|jpg)')
    .pipe(gulp.dest(DEST))
})

gulp.task('minify-css', function () {
  gulp.src('src/**/*.css')
    .pipe(gulpif(!IS_DEV, minifyCss()))
    .pipe(gulp.dest(DEST))

})

gulp.task('compress-extension', function () {
  gulp.src('src/extension/**/*.js')
    .pipe(gulpif(!IS_DEV, uglify()))
    .pipe(gulp.dest(path.join(DEST, 'extension')))

})

gulp.task('concat-js', ['compress-extension'], function () {
  gulp.src(['vendor/highlight/highlight.pack.js',
    'vendor/marked-0.3.5.min.js',
    'src/blog.js'])
    .pipe(concat('core.js'))
    .pipe(gulpif(!IS_DEV, uglify()))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(DEST))
})

gulp.task('concat-css', ['minify-css'], function () {
  gulp.src(['vendor/highlight/styles/main.css',
    'vendor/github-markdown.css',
    'vendor/blog.css'])
    .pipe(concat('core.css'))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(DEST))
})

gulp.task('build', ['concat-css', 'concat-js', 'copy'])

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*', ['build'])
})

gulp.task('default', ['watch'])
