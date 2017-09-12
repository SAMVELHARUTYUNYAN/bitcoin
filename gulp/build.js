'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
      path.join(conf.paths.src, '/**/*.html'),
      path.join('!' + conf.paths.src, '/index.html'),
      path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ])
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
});

function htmlTask() {

  var htmlFilter = $.filter('*.html', { restore: true, dot: true});
  var jsFilter = $.filter('**/*.js', { restore: true, dot: true});
  var cssFilter = $.filter('**/*.css', { restore: true, dot: true});

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())

    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.rev())
    // .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.replace('../../../bower_components/bootstrap-sass/assets/fonts/bootstrap', '/fonts'))
    .pipe($.replace('../../../bower_components/font-awesome/fonts', '/fonts'))
    .pipe($.cleanCss({ processImport: false }))
    .pipe($.rev())
    // .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe($.revReplace())
    .pipe($.sourcemaps.write('maps'))
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
}

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});



gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
      path.join(conf.paths.favicons, '/**/*'),
      path.join(conf.paths.src, '/**/*'),
      path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
    ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('html', ['inject', 'partials'], htmlTask);

gulp.task('build', ['html', 'other', 'images', 'fonts']);
