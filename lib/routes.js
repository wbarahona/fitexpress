'use strict';

// load modules ========================================
const Controllers = require('./controllers');
const Config = require('getconfig');

// export the plugin ==================================
exports.register = (plugin,  options, next) => {

    // route
    plugin.route([
        // items routes for piece of food
        { method: 'GET', path: '/items', config: Controllers.Items.read },
        { method: 'GET', path: '/items/{_id}', config: Controllers.Items.read },
        { method: 'POST', path: '/items/', config: Controllers.Items.create },
        { method: 'DELETE', path: '/items/{_id}', config: Controllers.Items.delete },
        { method: 'PUT', path: '/items/', config: Controllers.Items.update }
    ]);

    // next
    next();
};

exports.register.attributes = {
    name: 'routes',
    version: require('../package.json').version
}