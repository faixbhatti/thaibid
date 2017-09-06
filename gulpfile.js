const gulp = require('gulp'),
    path = require('path'),
    gulpUtil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    preCache = require('sw-precache'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    babel = require('gulp-babel'),
    order = require("gulp-order"),
    sourcemaps = require('gulp-sourcemaps'),
    purify = require('gulp-purifycss'),
    fs = require('fs'),
    key = require('./key'),
    tinify = require('tinify');

tinify.key = key;

gulp.task('default', ['create-sw', 'watchHtml']);

gulp.task('build-vendor', () =>
    gulp.src('bower_components/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(order([
        "vendor-1/angular.js",
        "vanilla/moment.min.js",
        "vanilla/locales.min.js",
        "vanilla/depends/headroom.min.js",
        "vanilla/depends/humanize-duration.js",
        "vendor-1/angular-aria/angular-aria.min.js",
        "vendor-1/angular-animate/angular-animate.min.js",
        "vendor-1/angular-material/angular-material.min.js",
        "vendor-1/angular-timer/dist/angular-timer.js",
        "vendor-1/angular-loading-bar/build/loading-bar.min.js",
        "vendor-1/angular-currency-name/src/angular-currency-name.js",
        "vendor-1/md-steppers/dist/md-steppers.js",
        "vendor-1/angular-material-data-table/dist/md-data-table.js",
        "vendor-1/angular-route/angular-route.js",
        "vendor-1/angular-material-icons/angular-material-icons.min.js",
        "vendor-2/jquery-3.1.1.js",
        "vendor-2/depends/jqueryHeadroom.js",
        "vendor-2/depends/nouislider.min.js",
        "vendor-2/depends/materialize.min.js",
    ]))
    .pipe(concat('vendors.bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('/maps/'))
    .pipe(gulp.dest('dist/js/vendors/'))
);

gulp.task('watchJS', ['build-app'], () => {
    gulp.watch(['app/**/*.js', './script.js'], ['create-sw'])
});

gulp.task('watchCss', ['build-css'], () => {
    gulp.watch('dev/css/onLoad/style.css', ['create-sw'])
});

gulp.task('build-app', () =>
    gulp.src(['app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(order([
        'app.js',
        'app.component.js',
        'user-service.js',
        'http-service'
    ]))
    .pipe(concat('app.bundle.min.js'))
    .pipe(ngAnnotate())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify().on('error', function(e) {
        console.log(e);
    }))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest('./dist/js'))
);

gulp.task('build-css', () =>
    gulp.src('dev/css/onLoad/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.css'))
    // .pipe(purify(['./app/**/*.js', './app/**/*.html']))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest('./dist/css'))
);

gulp.task('watchHtml', () => {
    gulp.watch(['app/**/*.html', './index.html'], ['create-sw']);
});

gulp.task('create-sw', ['watchCss', 'watchJS'], callback => {
    preCache.write(path.join('.', 'sw.js'), {
        runtimeCaching: [{
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'cacheFirst',
            options: {
                cache: {
                    maxEntries: 10,
                    name: 'google-apis'
                }
            },
        }],
        staticFileGlobs: [
            './script.js',
            './manifest.json',
            './app/**/*.{html,json}',
            './dist/**/*.{js,css,eot,ttf,woff,woff2}',
            './**/*.{png,jpeg,jpg,svg,gif}',
            './index.html',
        ],
        stripPrefix: '.',
        maximumFileSizeToCacheInBytes: 15000000,
    }, callback)
});