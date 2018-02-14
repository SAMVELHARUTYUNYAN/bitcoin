(function () {

    'use strict';

    var express = require('express');
    var proxyMiddleware = require('http-proxy-middleware');
    var conf = require('./gulp/conf');
    var proxyOptions = {
        target: 'https://masternodes.online/currencies/BLT',
        changeOrigin: true
        // logLevel: 'debug',
        // onProxyReq: function (proxyReq, req, res) {
        //
        // }
    };

    var app = express();

    app.use(express.static(conf.paths.dist));

    app.use('/api', proxyMiddleware(proxyOptions));

    app.get('/', function(req, res, next) {
        res.sendFile('index.html', {root: conf.paths.dist });
        next();
    });

    app.listen(8080);


})();