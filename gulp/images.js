(function () {

    'use strict';

    var path = require('path');
    var gulp = require('gulp');
    var conf = require('./conf');

    // images task
    gulp.task('images', function () {
        return gulp.src(path.join(conf.paths.src, '/_assets/images/**/*'))
            .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/images')))
            .pipe(gulp.dest(path.join(conf.paths.dist, '/images')));
    });

})();
