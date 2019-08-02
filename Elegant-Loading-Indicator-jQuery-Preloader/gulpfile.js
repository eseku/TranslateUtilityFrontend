'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    pump = require('pump');


gulp.task('compile', function () {
    return gulp.src('./src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('uglify', function (cb) {
    pump([
            gulp.src('./src/js/*.js'),
            uglify(),
            gulp.dest('./src/js/min')
        ],
        cb
    );
});