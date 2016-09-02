'use strict';

// load modules ========================================
const Mongoose = require('mongoose');
const Config = require('getconfig');

// declaring internals ================================
const internals = {
    closeConnection: () => {

        internals.db.close(() => {
            process.exit(0);
        });
    }
};

// mongo connections =================================
Mongoose.connect(`mongodb://${Config.database.mongodb.host}:${Config.database.mongodb.port}/${Config.database.mongodb.db}`);
internals.db = Mongoose.connection;

// on error
internals.db.on('error', () => {

    console.log('error', 'Error connecting the db');
    internals.closeConnection();
});

// if everything if fine log the success connections to the db
internals.db.on('open', () => {

    console.log(`Connections of the db ${Config.database.mongodb.db} success`);
});

// when the process is off, we need to shout down the connection
process.on('SIGINT', () => {

    console.log(`Mongoose disconnect on db termination`)
    internals.closeConnection();
});

// exposing the internals ===========================
module.exports = {
    Mongoose: Mongoose,
    db: internals.db
}