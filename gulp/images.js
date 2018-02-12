(function () {

    'use strict';

    var path = require('path');
    var gulp = require('gulp');
    var conf = require('./conf');
    var imagemin = require('gulp-imagemin');

    // images task
    gulp.task('images', function () {
        console.debug(this.seq.slice(-1)[0]);
        return gulp.src(path.join(conf.paths.src, '/_assets/images/**/*'))
            .pipe(imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                verbose: true,
                svgoPlugins: [{removeViewBox: true}]
            }))
            .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/images')))
            .pipe(gulp.dest(path.join(conf.paths.dist, '/images')));
    });

})();
