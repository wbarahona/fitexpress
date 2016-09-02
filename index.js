'use strict';

// load modules ========================================
const Hoek = require('hoek');
const Config = require('getconfig');
const Server = require('./lib');
require('./lib/db');

// instanls declaratiosn ==============================
const internals = {
    options: { relativeTo: `${__dirname}/lib` }
};

// initialize the server ============================
Server.init(Config.manifest, internals.options, (err, server) => {
    
    Hoek.assert(!err, err);

    // server connections
    const api = server.select('api');
    server.app = {
        rootPath: __dirname
    };

    // log the start of the servers
    console.log(`Server is running on: ${api.info.uri}`);
});