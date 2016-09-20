'use strict';

// load modules ========================================
const Controllers = require('./controllers');
const Config = require('getconfig');

// export the plugin ==================================
exports.register = (plugin,  options, next) => {

    // route
    plugin.route([
        // items routes for piece of food
        { method: 'GET', path: '/items/', config: Controllers.Items.read },
        { method: 'GET', path: '/items/{_id}', config: Controllers.Items.read },
        { method: 'POST', path: '/items/', config: Controllers.Items.create },
        { method: 'DELETE', path: '/items/{_id}', config: Controllers.Items.delete },
        { method: 'PUT', path: '/items/', config: Controllers.Items.update },

        // items diets routes
        { method: 'GET', path: '/itemdiets/', config: Controllers.Itemdiets.read },
        { method: 'GET', path: '/itemdiets/{_id}', config: Controllers.Itemdiets.read },
        { method: 'POST', path: '/itemdiets/', config: Controllers.Itemdiets.create },
        // Diets routes
        { method: 'GET', path: '/diets/', config: Controllers.Diets.read },
        { method: 'GET', path: '/diets/{_id}', config: Controllers.Diets.read },
        { method: 'POST', path: '/diets/', config: Controllers.Diets.create },
        { method: 'DELETE', path: '/diets/{_id}', config: Controllers.Diets.delete },
        { method: 'PUT', path: '/diets/', config: Controllers.Diets.update },
        // day plans 
        { method: 'GET', path: '/dayplans/', config: Controllers.Dayplans.read },
        { method: 'GET', path: '/dayplans/{_id}', config: Controllers.Dayplans.read },
        { method: 'POST', path: '/dayplans/', config: Controllers.Dayplans.create }


    ]);

    // next
    next();
};

// exposing all the attributes
exports.register.attributes = {
    name: 'routes',
    version: require('../package.json').version
}