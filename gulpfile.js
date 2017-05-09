const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const dest = require('gulp-dest');
const htmlbeautify = require('gulp-html-beautify');
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const shell = require('gulp-shell');
const server = require('gulp-express');


gulp.task('rm-dist', function() {
    return del('dist');
});

gulp.task('mkdir-dist', function() {
    return new Promise(function(resolve, reject) {
        if (!fs.existsSync('./dist/')) {
            fs.mkdirSync('./dist/');
        }
        resolve();
    });
});

gulp.task('html', function() {
    return gulp.src(['pages/**/*.html','!pages/**/*.dev.html'])
        .pipe(htmlbeautify())
        .pipe(replace(/\w+\.min\.css/g, 'style.min.css'))
        .pipe(replace(/\w+\.min\.js/g, 'scripts.min.js'))
        .pipe(replace(/(\.\.\/)+dist\/images/g, 'images'))
        .pipe(dest('dist/:name.html'))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
    return gulp.src('pages/merged/merged.min.css')
        .pipe(replace(/(\.\.\/)+images/g, 'images'))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp.src('pages/merged/merged.min.js')
        .pipe(rename("scripts.min.js"))
        .pipe(gulp.dest('dist'));
});

gulp.task('make', shell.task([
    'node_modules/enb/bin/enb make clean',
    'YENV=production node_modules/enb/bin/enb make'
]));


gulp.task('make', shell.task([
    'node_modules/enb/bin/enb make clean',
    'YENV=production node_modules/enb/bin/enb make'
]));


gulp.task('dist', gulp.series('rm-dist', 'mkdir-dist', 'make', 'css', 'js', 'html'));


// ------------------

gulp.task('serv', function () {
    server.run(['.express/app.js']);

    var watcher = gulp.watch('.express/**/*.*');
    watcher.on('change', function(path, stat) {
        server.run(['.express/app.js']);
    });
});
