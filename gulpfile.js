const gulp = require('gulp');
const del = require('del');
const dest = require('gulp-dest');
const htmlbeautify = require('gulp-html-beautify');
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const shell = require('gulp-shell');

gulp.task('clean', function() {
    return del('dist')
});


gulp.task('html', function() {
    return gulp.src('pages/**/*.html')
        .pipe(htmlbeautify())
        .pipe(replace(/\w+\.min\.css/g, 'style.min.css'))
        .pipe(replace(/\w+\.min\.js/g, 'scripts.min.js'))
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

gulp.task('images', function() {
    return gulp.src('images/*.*')
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('make', shell.task([
    'node_modules/enb/bin/enb make clean',
    'YENV=production node_modules/enb/bin/enb make'
]));

gulp.task('dist', gulp.series('make', 'clean', 'css', 'js', 'images', 'html'));
