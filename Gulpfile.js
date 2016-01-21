var gulp = require('gulp');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');

gulp.task('connect', ['copy'], function() {
  connect.server({
    root: ['./build'],
    port: 3001
  });
});

gulp.task('scripts', function() {
	return gulp.src('./src/app.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })    
    .pipe(gulp.dest('./build'))
    .pipe(livereload())
  ;
});

gulp.task('copy', function() {

  return gulp.src(['./src/**/**.*', '!./src/**/**.ts'], {
      base: './src'
    })
    .pipe(gulp.dest('./build'))
    .pipe(livereload())
  ;
});

gulp.task('build', ['scripts', 'copy']);

gulp.task('default', ['scripts', 'copy', 'connect'], function() {
  livereload.listen();
  gulp.watch(['!./src/**/**.ts', './src/**/**.*'], ['copy']);
  gulp.watch('./src/**/**.ts', ['scripts']);
});
