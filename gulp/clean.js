var conf = require('./conf');
var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function () {
  return gulp.src(['dist', 'public'], {read: false})
          .pipe(clean());
});