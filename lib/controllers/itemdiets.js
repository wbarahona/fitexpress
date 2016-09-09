'use strict';

// loading the modules ==============================================
const Boom = require('boom');
const Joi = require('joi');
const Base = require('./base');

// declaring internals ==============================================
const internals = {
    collection: 'itemdiets'
};

// extending the base class with our class =========================
class Itemdiets extends Base {
    // add you own code here
};

// instantiate the object from the class
const inst = new Itemdiets(internals.collection);

// read method =====================================================
internals.read = inst.genericConfig.read;

// create method ===================================================
internals.create = {
    validate: {
        payload: {
            main: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            side_1: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            side_2: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            value: Joi.number()
        }
    },
    handler: inst.create.bind(inst)
};

// exposing the internals ==========================================
module.exports = internals;