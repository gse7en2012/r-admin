var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-cssnano'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin'),
    babel = require("gulp-babel");
var paths = {
    scripts: 'client/src/js/**/*.*',
    //styles: 'client/src/less/**/*.*',
    styles: 'client/src/components/mystyle.css',
    images: 'client/src/img/**/*.*',
    templates: 'client/src/templates/**/*.html',
    index: 'client/src/index.html',
    login: 'client/src/login.html',
    bower_fonts: 'client/src/components/**/*.{ttf,woff,eof,svg,woff2}',
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('client/dist/'));
});

gulp.task('loginpage', function() {
    return gulp.src(paths.login)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('client/dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('client/dist/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('client/dist/img'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(babel())
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('client/dist/js'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('client/dist/css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('client/dist/templates'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
    gulp.watch([paths.login], ['loginpage']);
});

/**
 * Live reload server
 */
//gulp.task('webserver', function() {
//    connect.server({
//        root: 'dist',
//        livereload: true,
//        port: 8888
//    });
//});
//
//gulp.task('livereload', function() {
//    gulp.src(['dist/**/*.*'])
//        .pipe(watch(['dist/**/*.*']))
//        .pipe(connect.reload());
//});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin','loginpage', 'build-assets', 'build-custom']);
//gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
gulp.task('default', ['build','watch']);