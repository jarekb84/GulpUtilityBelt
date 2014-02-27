var gulp = require("gulp");
var $ = require('gulp-load-plugins')();

gulp.task('default', ['registeredTasks'], function() {});

gulp.task('registeredTasks', function() {
  for (var task in gulp.tasks) {
    $.util.log("    " + task);
  }
});

gulp.task('installedPlugins', function() {
  for (var plugin in $) {
    $.util.log("    " + plugin);
  }
});

gulp.task('clean', function() {
  gulp.src('dist/*.*', {
    read: false
  })
    .pipe($.clean());
});

gulp.task('imagemin', ['clean'], function() {
  gulp.src(['src/*.png', 'src/*.jpeg', 'src/*.jpg', 'src/*.gif'])
    .pipe($.imagemin())
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyCss', ['clean'], function() {
  gulp.src('src/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyJs', ['clean'], function() {
  gulp.src('src/*.js')
    .pipe($.uglify({outSourceMap: true}))
    .pipe(gulp.dest('dist'));
});