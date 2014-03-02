var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var args = require("nomnom");

gulp.task('default', function() {
  $.util.log("Registered tasks");
  for (var task in gulp.tasks) {
    if (task.lastIndexOf("_", 0) !== 0) {
      $.util.log("    " + task);
    }
  }
});

/***************
  Public usage tasks
****************/
gulp.task('imagemin', ['_clean'], function() {
  gulp.src(['src/*.png', 'src/*.jpeg', 'src/*.jpg', 'src/*.gif'])
    .pipe($.imagemin())
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyCss', ['_clean'], function() {
  gulp.src('src/*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyJs', ['_clean'], function() {
  gulp.src('src/*.js')
    .pipe($.uglify({
      outSourceMap: true
    }))
    .pipe(gulp.dest('dist'));
});


/**************
  Dev related tasks
***************/
// sets up bump CLI arguments to be passed in
args = args.options({
  bumpPatch: {
    abbr: 'bp',
    flag: true,
    // this will always run, if other bump arg passed
    // will overide to new version anyway
    default: true,
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

gulp.task('_installedPlugins', function() {
  for (var plugin in $) {
    $.util.log("    " + plugin);
  }
});

gulp.task('_clean', function() {
  gulp.src('dist/*.*', {
    read: false
  })
    .pipe($.clean());
});

gulp.task('_bump', function() {
  var bump = gulp.src(['package.json'])
    .pipe($.if(args.bumpPatch, $.bump()))
    .pipe($.if(args.bumpMinor, $.bump({type: 'minor'})))
    .pipe($.if(args.bumpMajor, $.bump({type: 'major'})))

    .pipe($.tap( function (file, t) {
        var config = JSON.parse(file.contents.toString());
        $.git.tag('v' + config.version, 'Version message');
        $.util.log("new tag " + config.version);
      }))
    .pipe(gulp.dest('./'));
});