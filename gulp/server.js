'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var pkg = require('../package.json');
var argv = require('yargs').argv;

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var express = require('express');


var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
        routes = {
            '/bower_components': 'bower_components'
        };
    }

    var server = {
        baseDir: baseDir,
        routes: routes
    };
    var proxyOptions = {
        target: pkg.api,
        changeOrigin: true
        // logLevel: 'debug',
        // onProxyReq: function (proxyReq, req, res) {
        //    console.log(proxyReq);
        //  }
    };

    server.middleware = proxyMiddleware('/', proxyOptions);

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        open: process.env.PORT ? false : true,
        notify: process.env.PORT ? false : true,
        ghostMode: false,
        port: process.env.PORT || 3000,
        browser: browser
    });
}

function prodServerInit(baseDir) {

    var proxyOptions = {
        target: pkg.api,
        changeOrigin: true,
        // logLevel: 'debug',
        // onProxyReq: function (proxyReq, req, res) {
        //
        // }
    };

    var app = express();

    app.use(express.static(baseDir));
    app.use('/api', proxyMiddleware(proxyOptions));

    app.get('*', function(req, res) {
        res.sendFile('index.html', {root: baseDir });
    });

    app.listen(process.env.PORT || 3000);

}

gulp.task('serve', ['watch', 'images', 'fonts'], function () {
    browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.favicons, conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
    prodServerInit(conf.paths.dist);
});
