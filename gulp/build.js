var gulp = require('gulp');
var conf = require('./conf');

var source = require('vinyl-source-stream'),
        browserify = require('browserify'),
        watchify = require('watchify'),
        reactify = require('reactify'),
        concat = require('gulp-concat'),
        gulpFilter = require('gulp-filter'),
        rename = require('gulp-rename'),
        bower = require('gulp-bower'),
        notify = require("gulp-notify");

gulp.task('browserify', function () {
  var bundler = browserify({
    entries: [conf.paths.src + '/app/main.js'], // Only need initial file, browserify finds the deps
    transform: [reactify], // We want to convert JSX to normal javascript
    debug: true, // Gives us sourcemapping
    cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  });
  var watcher = watchify(bundler);

  return watcher
          .on('update', function () { // When any files update
            var updateStart = Date.now();
            console.log('Updating!');
            watcher.bundle() // Create new bundle that uses the cache for high performance
                    .pipe(source('main.js'))
                    // This is where you add uglifying etc.
                    .pipe(gulp.dest('./dist/'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
          })
          .bundle() // Create the initial bundle when starting the task
          .on('error', function (err) {
            notify().write(err);
          })
          .pipe(source('main.js'))
          .pipe(gulp.dest(conf.paths.dist + '/app'));
});

gulp.task('bower', function () {
  //https://gist.github.com/ktmud/9384509
  var publishdir = conf.paths.dist;
  var dist = {
    css: publishdir + '/static/',
    js: publishdir + '/static/',
    vendor: publishdir + '/static/'
  };
  var jsFilter = gulpFilter('**/*.js', {restore: true});
  var cssFilter = gulpFilter('**/*.css', {restore: true});
  return bower()
          .pipe(jsFilter)
          .pipe(concat('vendor.js'))
          .pipe(gulp.dest(dist.js))
          .pipe(jsFilter.restore)
          .pipe(cssFilter)
          .pipe(concat('vendor.css'))
          .pipe(gulp.dest(dist.css))
          .pipe(cssFilter.restore)
          .pipe(rename(function (path) {
            if (~path.dirname.indexOf('fonts')) {
              path.dirname = '/fonts'
            }
          }))
          .pipe(gulp.dest(dist.vendor));
});

gulp.task('static', function () {
  return gulp.src(conf.paths.src + '/*.html')
          .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('css', function () {
  return gulp.src(conf.paths.src + '/styles/**/*.css')
          .pipe(concat('main.css'))
          .pipe(gulp.dest(conf.paths.dist + '/styles'));
});

gulp.task('basewatch', function () {
  gulp.watch(conf.paths.src + '/styles/**/*.css', ['css']);
  gulp.watch(conf.paths.src + '/*.html', ['static']);
});