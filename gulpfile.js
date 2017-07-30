"use strict";

let gulp = require('gulp');
let sass = require('gulp-sass');           // npm install --save-dev gulp-sass
let babel = require('gulp-babel');         // npm install --save-dev gulp-babel babel-preset-2015
let uglify = require('gulp-uglify');       // npm install --save-dev gulp-uglify
let concat = require('gulp-concat');       // npm install --save-dev gulp-concat
let rename = require('gulp-rename');       // npm install --save-dev gulp-rename
let cleancss = require('gulp-clean-css');  // npm install --save-dev gulp-clean-css

gulp.task('sass', function() {
  return gulp.src('./scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("global.css"))
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('js', function() {
  return gulp.src('./js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('game-box.js'))
    .pipe(uglify().on('error', function (e) {console.log(e)}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js:watch', function() {
  gulp.watch('./js/*.js', ['js']);
});

gulp.task('default', ['sass:watch', 'js:watch']);
