'use strict';

// loading modules ========================================================
const Boom = require('boom');
const JSend = require('jsend');
const Joi = require('joi');

// delcaring internals ==================================================
const internals = {
    model: null
};

// declaring the CRUD class base 
class Base {
    constructor(collection){

        // global properties
        this.collectionName = collection.charAt(0).toUpperCase() + collection.substr(1).toLowerCase();
        this.model = require(`../model/${collection}`);
        this.Collection = this.model[this.collectionName];

        this.genericConfig = {
            read: {
                validate: {
                    params: {
                        _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
                    }
                },
                handler: this.read.bind(this)
            },
            delete: {
                validate: {
                    params: {
                        _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
                    }
                },
                handler: this.delete.bind(this)
            }
        };
    };

    // reead method
    read(request, reply) {
        // reading from the collectiosn
        const _id = request.params._id || null;
        const query = (_id) ? { _id:_id } : {};

        // read from the collcetion 
        this.Collection.find(query, (err, docs) => {
        
            if (err) {

                reply(Boom.badImplementation(err));
            };

            if (!docs.length) {

                reply(Boom.notFound(`Record with ${_id} not found`));
            } else {

                // everything if finde send everything 
                reply(JSend.success(docs));
            }
        });

    };

    // create method
    create(request, reply) {

        // create a new collection base on the request
        const newDoc = new this.Collection(request.payload);

        newDoc.save((err, doc) => {

            if (!err) {
                // send everything to the pages
                reply(JSend.success(doc));

            } else {

                if (err.code === 11000 || err.code === 11001) {

                    Boom.forbidden(`Please provide another id, it already exits`);

                } else {

                    Boom.forbidden(err);
                }
            }
        });
    };

    // update method
    update(request, reply) {
    
        // get the condiotn including the id on the payload
        const conditions = {
            _id: request.payload._id
        };

        // delte the request id for the current code
        delete request.payload._id;

        // find an id and update
        this.Collection.findOneAndUpdate(conditions, request.payload, (err, doc) => {
            
            if (!err) {

                // if everything is good send back the logs
                reply(JSend.success(doc));

            } else {

                reply(Boom.forbidden(err));
            }
        });
    };

    // delte method
    delete(request, reply) {
        // this process will delete the collection base on the request id
        this.Collection.findOne({ '_id': request.params._id }, (err, doc) => {

            if (!err && doc) {
                // delete the doc
                doc.remove();

                reply(JSend.success(`${this.collectionName} deleted succesfully`));

            } else if(!err) {

                reply(boom.notFound());

            } else {

                reply(Boom.badRequest(`Could not found ${this.collectionName}`));
            }
        });
       
    };

};

// exposing internals ===================================================
module.exports = Base;