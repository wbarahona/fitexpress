'use strict';

// loading modules ==========================================================
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// declaring the internals ==================================================
const internals = {};

// create the table struct ==================================================
internals.ItemDietsSchema = new Schema({
    main: { type: Schema.Types.ObjectId, required: true },
    side_1: { type: Schema.Types.ObjectId, required: true },
    side_2: { type: Schema.Types.ObjectId, required: true },
    value: { type: Number, required: true },
    date_created: { type: Date, default: Date.now }
});

// create the table
internals.itemdiets = Mongoose.model(`itemdiets`, internals.ItemDietsSchema);

// exporting the internals ==================================================
module.exports = {
    Itemdiets: internals.itemdiets
}