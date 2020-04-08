var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
  minifyCSS = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  pipeline = require('readable-stream').pipeline,
  htmlmin = require('gulp-htmlmin'),
  imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(connect.reload())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(plumber())
    .pipe(livereload())
    .pipe(gulp.dest('./css'))
});

gulp.task('compress', function () {
  return gulp.src('lib/*.js').
    pipe(uglify()).
    pipe(gulp.dest('dist')).
    pipe(gulp.src('src/images/*'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('connect', function (done) {
  connect.server({
    root: './',
    livereload: true
  });
  done()
});

gulp.task('minify', () => {
  return gulp.src('lib/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  livereload.listen()
  gulp.watch('./saas/**/*.scss', gulp.parallel(['sass']));
});

gulp.task('default', gulp.series("connect", "sass", "compress", "minify", "watch"));




