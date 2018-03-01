'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var scss = require('gulp-scss')

gulp.task('default', ['styles'], function() {
    gulp.watch('css/style.css', ['styles']);
})

gulp.task('styles', function() {
    gulp.src('css/style.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('build'));
    console.log(" autoprefixer done")
})

gulp.task('scss', function() {
    return gulp.src('sass/style.scss')
        .pipe(scss().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
    console.log("sass to css done")
});


gulp.task('sass', function() {
    return gulp.src('sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
    console.log("sass to css done")
});

gulp.task('sass:watch', function() {
    gulp.watch('sass/style.scss', ['sass'])
});