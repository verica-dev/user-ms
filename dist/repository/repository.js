"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoClient = new mongodb_1.MongoClient();
const dbUrl = "mongodb://localhost:27017/hairstudio";
const collectionName = 'user';
var user;
exports.getUser = (user_id) => __awaiter(this, void 0, void 0, function* () {
    const db = mongoClient.connect(dbUrl);
    return db.then((dbConnection) => {
        console.log('dbConnection : ' + dbConnection);
        console.log('user_id : ' + user_id);
        const usr = dbConnection.collection(collectionName).findOne({ user_id: user_id });
        dbConnection.close();
        return usr;
    });
});
exports.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
    const db = mongoClient.connect(dbUrl);
    return db.then((dbConnection) => {
        console.log('dbConnection : ' + dbConnection);
        const users = dbConnection.collection(collectionName).find({}).toArray();
        dbConnection.close();
        return users;
    });
});
