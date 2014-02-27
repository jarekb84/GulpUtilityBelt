var gulp = require("gulp");
var args = require("nomnom");
var $ = require('gulp-load-plugins')();

var args = require("nomnom").options({
      bumpPatch: {
         abbr: 'bp',
         flag: true,
         help: "Will patch the version"
      },
      bumpMinor: {
         abbr: 'bmn',
         flag: true,
         help: "Semantic minor"
      },
      bumpMajor: {
         abbr: 'bmj',
         flag: true,
         help: "Semantic major"
      }
   }).parse();

/*var opts = require("nomnom")
   .option('debug', {
      abbr: 'd',
      flag: true,
      help: 'Print debugging info'
   })
   .option('config', {
      abbr: 'c',
      default: 'config.json',
      help: 'JSON file with tests to run'
   })
   .option('version', {
      flag: true,
      help: 'print version and exit',
      callback: function() {
         return "version 1.2.4";
      }
   })
   .parse();*/


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

gulp.task('bump', function(){
  gulp.src(['package.json'])
  .pipe($.if(args.bumpPatch, $.bump()))
  .pipe($.if(args.bumpMinor, $.bump({type:'minor'})))
  .pipe($.if(args.bumpMajor, $.bump({type:'major'})))
  .pipe(gulp.dest('./'));
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