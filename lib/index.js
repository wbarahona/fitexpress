'use strict';

// load modules ================================
const Glue = require('glue');
const Hoek = require('hoek');

// Glue start =================================
exports.init = (manifest, options, next) => {

    Glue.compose(manifest, options, (err, server) => {
        
        Hoek.assert(!err, err);§

        // run the servers
        server.start((err) => {
            
            return next(err, server);
        });
    });
};