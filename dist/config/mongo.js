"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const getMongoURL = (options) => {
    const url = options.servers
        .reduce((prev, cur) => prev + cur + ',', 'mongodb://');
    return `${url.substr(0, url.length - 1)}/${options.db}`;
};
exports.connect = (options, mediator) => {
    mediator.once('boot.ready', () => {
        mongodb_1.MongoClient.connect(getMongoURL(options), {
            db: options.dbParameters(),
            server: options.serverParameters()
        }, (err, db) => {
            if (err) {
                mediator.emit('db.error', err);
            }
            db.admin().authenticate(options.user, options.pass, (err, result) => {
                if (err) {
                    mediator.emit('db.error', err);
                }
                mediator.emit('db.ready', db);
            });
        });
    });
};
