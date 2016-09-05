'use strict';

// loading modules ==============================================
const Boom = require('boom');
const Joi = require('joi');
const Base = require('./base');

// defindin the interlas 
const internals = {
    collection: 'diets'
};

// declaring the class and extend base class
class Diets extends Base {
    // Create new code here
};

// instantiate the class object
const inst = new Diets(internals.collection);

// read method 
internals.read = inst.genericConfig.read;

// create method
internals.create = {
    validate: {
        payload: {
            name: Joi.string().required(),
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
}

// delete method
internals.delete = inst.genericConfig.delete;


// exposing the modules
module.exports = internals;