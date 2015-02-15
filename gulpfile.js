'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('default', ['js', 'css']);

gulp.task('js', function() {

    return gulp.src(['src/js/**/*.js'])
    .pipe(plugins.concat('app.all.js', {newLine: ';'}))
    .pipe(gulp.dest('build/js'))

    // minifier
    .pipe(plugins.concat('app.all.min.js', {newLine: ';'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('build/js'));

});

gulp.task('css', function() {

    return gulp.src(['src/**/*.css'])
    .pipe(plugins.concat('app.css'))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest('build/css'))

    // minifier
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest('build/css'));

});
