'use strict';

// loading modules ================================================================
const Boom = require('boom');
const Base = require('./base');
const Joi = require('joi');

// declaring internals =============================================================
const internals = {
    collection: 'dayplans'
};

// class extention =================================================================
class Dayplans extends Base {
    // add code to 
};

// instantiate the obejct =========================================================
const inst = new Dayplans(internals.collection);

// read method ====================================================================
internals.read = inst.genericConfig.read;

// create method =================================================================
internals.create = {
    validate: {
        payload: {
            diets: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            no_days: Joi.date().required(),
            value: Joi.number()
        }
    },
    handler: inst.create.bind(inst)
};

// exposing the internals =========================================================
module.exports = internals;
