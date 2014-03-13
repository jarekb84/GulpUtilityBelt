var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:false});
var args = require('nomnom');
var autoprefixer = require('autoprefixer');

gulp.task('default', function() {  
  $.util.log('Registered tasks');
  for (var task in gulp.tasks) {
    if (task.lastIndexOf('_', 0) !== 0) {
      $.util.log('    ' + task);
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

gulp.task('processCss', ['_clean'], function() {
  gulp.src('src/*.css')
    .pipe($.
      if (!args.skipAutoPrefixer,
        $.tap(function(file) {
          var css = file.contents.toString();
          file.contents = new Buffer(autoprefixer.process(css).css);
        })))
    .pipe($.minifyCss())
    .pipe($.rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('processJs', ['_clean'], function() {
  gulp.src('src/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.uglify({
      outSourceMap: true
    }))
    .pipe($.rename(function(path) {
      //sourcemap already has .min in basename
      if (path.extname !== '.map') {
        path.basename += '.min';
      }
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
    help: 'Will patch the version'
  },
  bumpMinor: {
    abbr: 'bmn',
    flag: true,
    help: 'Semantic minor'
  },
  bumpMajor: {
    abbr: 'bmj',
    flag: true,
    help: 'Semantic major'
  },
  message:{
    abbr: 'msg',
    flag: true,
    help: 'message arugment'
  },
  skipAutoPrefixer: {
    abbr: 'scap',
    flag: true,
    help: 'Prevent autoprefixer postprocessing on css files.'
  }
}).parse();

gulp.task('_installedPlugins', function() {
  for (var plugin in $) {
    $.util.log('    ' + plugin);
  }
});

gulp.task('_clean', function() {
  gulp.src('dist/*.*', {
    read: false
  })
    .pipe($.clean());
});

gulp.task('_bump', function() {
  return gulp.src(['package.json'])
    .pipe($.if(args.bumpPatch, $.bump()))
    .pipe($.if(args.bumpMinor, $.bump({type: 'minor'})))
    .pipe($.if(args.bumpMajor, $.bump({type: 'major'})))
    .pipe($.tap(
      function(file) {
        var msg = args.message || 'New Version',
          config = JSON.parse(file.contents.toString());

        $.git.tag('v' + config.version, msg);
        $.util.log('new tag ' + config.version);
      }
    ))
    .pipe(gulp.dest('./'));
});