var gulp = require('gulp'),
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
    fs = require('fs'),
    tinify = require('tinify');

tinify.key = 'JR6wJm9v5x0K4x3s4YhZlP3yypBETkph';



gulp.task('default', ['create-sw', 'watchHtml'])

gulp.task('build-vendor', () =>
    gulp.src('bower_components/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(order([
        "vanilla/moment.min.js",
        "vanilla/locales.min.js",
        "vanilla/**/*.js",
        "vendor-1/angular/angular.js",
        "vendor-1/angular-aria/angular-aria.min.js",
        "vendor-1/angular-animate/angular-animate.min.js",
        "vendor-1/angular-material/angular-material.min.js",
        "vendor-1/angular-timer/dist/angular-timer.js",
        "vendor-1/angular-loading-bar/build/loading-bar.min.js",
        "vendor-1/angular-currency-name/src/angular-currency-name.js",
        "vendor-1/angular-material-data-table/dist/md-data-table.js",
        "vendor-1/angular-route/angular-route.js",
        "vendor-1/angular-material-icons/angular-material-icons.min.js",
        "vendor-2/jquery-3.1.1.js",
        "vendor-2/**/*.js",
    ]))
    .pipe(concat('vendors.bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('/maps/'))
    .pipe(gulp.dest('dist/js/vendors/'))
)

gulp.task('watchJS', ['build-app'], () => {
    gulp.watch(['app/**/*.js', './script.js'], ['create-sw'])
})

gulp.task('watchCss', ['build-css'], () => {
    gulp.watch('dev/css/style.css', ['create-sw'])
})

gulp.task('build-app', () =>
    gulp.src(['app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(order([
        'app.js',
        'app.component.js'
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
)

gulp.task('build-css', () =>
    gulp.src('dev/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest('./dist/css'))
)

gulp.task('tinify-images', () => {
    const tinifyImages = (folder, img) => {
        fs.readdir(folder, (err, files) => {
            if (!!img) {
                files.forEach(file => {
                    if (file === img) {
                        let fileName = `${folder}${file}`,
                            tiniedFile = `${folder}1-${file}`;
                        console.log('Found file')
                        source = tinify.fromFile(fileName);
                        source.toFile(tiniedFile);
                    }
                })
            } else {
                files.forEach(file => {
                    let fileName = `${folder}${file}`,
                        tiniedFile = `${folder}1-${file}`;
                    if (fileName.includes('.jpg') || fileName.includes('.png') || fileName.includes('.jpeg')) {
                        source = tinify.fromFile(fileName);
                        source.toFile(tiniedFile);

                    }
                })
            }
        })
    };
    let dir = './image/slideshow/',
        image = 'placeholder.jpg';
    tinifyImages(dir, image);
})

gulp.task('watchHtml', () => {
    gulp.watch(['app/**/*.html', './index.html'], ['create-sw']);
})

gulp.task('create-sw', ['watchCss', 'watchJS'], callback => {
    preCache.write(path.join('.', 'sw.js'), {
        runtimeCaching: [{
                urlPattern: '/^https:\/\/fonts.googleapis\.com\/icon?family=Material+Icons',
                handler: 'cacheFirst',
                options: {
                    cache: {
                        maxEntries: 2,
                        name: 'material-icons-cache'
                    }
                }
            },
            {
                urlPattern: '/^https:\/\/fonts\.googleapis\.com\/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en',
                handler: 'cacheFirst',
                options: {
                    cache: {
                        maxEntries: 2,
                        name: 'roboto-cache'
                    }
                }
            }
        ],
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
})