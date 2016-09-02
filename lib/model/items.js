'use strict';

// load modules ========================================
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// declaring internals ===============================
const internals = {};

// model properites ====================================
internals.ItemsSchema = new Schema({
    name: { type:String, trim: true },
    description: { type:String },
    date_created: { type: Date, default: Date.now }
});

// create the table
internals.items = Mongoose.model(`items`, internals.ItemsSchema);

// exposing the internals
module.exports = {
    Items: internals.items
}