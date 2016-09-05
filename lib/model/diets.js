'use strict';

// loading modules =======================================
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// delcaring internals ==================================
const internals = {};

// creating the structure of the collections
internals.DietsSchema = new Schema({    
    name: { type: String, require: true },
    description: { type: String },
    date_created: { type: Date, default: Date.now }
});

// paste the collction to the mongoose model object
internals.diets = Mongoose.model(`diets`, internals.DietsSchema);

// exposing the interlas =================================
module.exports = {
    Diets: internals.diets
}
