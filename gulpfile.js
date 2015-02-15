'use strict';

// Config

var publish_folder = 'public';

// Gulp settings

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

var paths = {
    scripts: [
        // dependencies
        'src/lib/jquery/dist/jquery.js',
        'src/lib/bootstrap/dist/js/bootstrap.js',
        // app main file
        'src/js/app.js',
        // app scripts
        'src/js/**/*.js'
    ],
    stylesheets: [
        // bootstrap
        'src/lib/bootstrap/dist/css/bootstrap.css',
        // app
        'src/js/**/*.css'
    ]
};

// Tasks

gulp.task('default', ['js', 'css', 'bootstrap_fonts', 'watch']);

gulp.task('clear', function(cb) {
    del([
        publish_folder+'/**/*.*',
        '!'+publish_folder+'/index.html',
        '!'+publish_folder+'/.gitkeep'
        ]
    , cb);
});

gulp.task('js', function() {

    return gulp.src(paths.scripts)
    .pipe(plugins.concat('app.all.js', {newLine: ';'}))
    .pipe(gulp.dest(publish_folder+'/js'))

    // minifier
    .pipe(plugins.sourcemaps.init())
        // .pipe(plugins.concat('app.all.min.js', {newLine: ';'}))
        .pipe(plugins.uglify())
        .pipe(
            plugins.rename({
                suffix: ".min"
            })
        )
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(publish_folder+'/js'))

    // notify
    .pipe(plugins.notify('Javascript files compilied!'));

});

gulp.task('css', function() {

    return gulp.src(paths.stylesheets)
    .pipe(plugins.concat('app.css'))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(publish_folder+'/css'))

    // minifier
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest(publish_folder+'/css'))

    // notify
    .pipe(plugins.notify('Stylesheet files compilied!'));

});

gulp.task('bower', function() {

    return plugins.bower()
        .pipe(gulp.dest('src/lib'));

});

gulp.task('bootstrap_fonts', function() {
    return gulp.src(['src/lib/bootstrap/dist/fonts/**/*.*'])
        .pipe(gulp.dest(publish_folder+'/fonts'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['js']);
    gulp.watch(paths.stylesheets, ['css']);
});
