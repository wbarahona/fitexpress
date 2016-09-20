'use strict';

// loading modules =======================================================
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// ========================================================================
const internals = {};

// struct of the table =====================================================
 internals.dayPlanSchema = new Schema({
    diets: { type: Schema.Types.ObjectId, Ref: 'diets', required: true },
    no_days: { type: Date },
    value: { type: Number, required: true },
    date_create: { type: Date, default: Date.now }
});

// create the table ======================================================
internals.dayplans = Mongoose.model(`dayplans`, internals.dayPlanSchema);

// exposing the internals ==================================================
module.exports = {
    Dayplans: internals.dayplans
};