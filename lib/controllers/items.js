'use strict';

// loading modules ==========================================
const Boom = require('boom');
const Joi = require('joi');
const Base =  require('./base');

// definding the interals =================================
const internals = {
    collection: 'items'
};

// creat a class an extending the base class
class Items extends Base {
    // here you can add current methods
};

// create the new object of the class
const inst = new Items(internals.collection);

// method internals 
internals.read = inst.genericConfig.read;

// create an items
internals.create = {
    validate: {
        payload: {
            name: Joi.string(),
            description: Joi.string()
        }
    },
    handler: inst.create.bind(inst)
};

// update method
internals.update = {
    validate: {
        payload: {
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            name: Joi.string(),
            description: Joi.string()
        }
    },
    handler: inst.update.bind(inst)
};

// delete method
internals.delete = inst.genericConfig.delete;

// exposing the modules ==================================
module.exports = internals;