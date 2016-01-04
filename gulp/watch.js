var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['browserify'], function () {
  browserSync.reload();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['browserify', 'static', 'css', 'bower'], function () {

  // Serve files from the root of this project
  browserSync.init({
	server: {
	  baseDir: "./dist"
	}
  });
  
  gulp.watch("./src/app/**/*", ['js-watch']);
});