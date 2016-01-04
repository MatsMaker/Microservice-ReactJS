var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('contact-watch', function () {
//  Start the server at the beginning of the task
  server.run(['app.js']);
  gulp.watch(['app.js'], [server.run]);
});