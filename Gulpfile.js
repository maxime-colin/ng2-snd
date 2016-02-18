var gulp = require('gulp');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
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
			this.emit('end');
		})
		.pipe(gulp.dest('./build'))
		.pipe(livereload());
});

gulp.task('copy', function(params) {
	return gulp.src(['./src/**/**.*', '!./src/**/**.ts', '!./src/styles/**'], {
			base: './src',
			dot: true
		})
		.pipe(gulp.dest('./build'))
		.pipe(livereload());
});

gulp.task('less', function () {
	return gulp.src('./src/styles/main.less')
		.pipe(less())
		.pipe(gulp.dest('./build'));
});

gulp.task('scriptsDist', function() {
	return gulp.src('./src/app.ts')
		.pipe(webpack(require('./webpack.config.js')))
		.on('error', function handleError() {
			this.emit('end');
		})
		.pipe(gulp.dest('./build'))
});

gulp.task('copyDist', function(params) {
	return gulp.src(['./src/**/**.*', '!./src/**/**.ts', '!./src/styles/**'], {
			base: './src',
			dot: true
		})
		.pipe(gulp.dest('./build'))
});

gulp.task('lessDist', function () {
	return gulp.src('./src/styles/main.less')
		.pipe(less())
		.pipe(gulp.dest('./build'));
});

gulp.task('build', ['scripts', 'copy', 'less']);
gulp.task('dist', ['scriptsDist', 'copyDist', 'lessDist']);


gulp.task('default', ['build'], function() {
	livereload.listen();

	gulp.watch(['./src/**/**.*', '!./src/**/**.ts'], ['copy']);
	gulp.watch('./src/**/**.ts', ['scripts']);
	gulp.watch('./src/styles/**/**.less', ['less']);
});
