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
class User {
    constructor(user_id, first_name, last_name, email, phone) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
    }
}
exports.User = User;
var user;
exports.getUser = (user_id) => __awaiter(this, void 0, void 0, function* () {
    const db = mongoClient.connect(dbUrl);
    return db.then((dbConnection) => {
        const usr = dbConnection.collection(collectionName).findOne({ user_id: user_id });
        dbConnection.close();
        return usr;
    });
});
exports.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
    const db = mongoClient.connect(dbUrl);
    return db.then((dbConnection) => {
        const users = dbConnection.collection(collectionName).find({}).toArray();
        dbConnection.close();
        return users;
    });
});
exports.addUser = (user) => __awaiter(this, void 0, void 0, function* () {
    const db = mongoClient.connect(dbUrl);
    return db.then((dbConnection) => {
        const collection = dbConnection.collection(collectionName);
        const db_user = collection.findOne({ "user_id": user.user_id });
        const response_msg = db_user.then((usr) => {
            let msg;
            if (usr == undefined) {
                msg = 'added new user: ' + JSON.stringify(user);
                collection.insertOne(user);
            }
            else {
                msg = `user with user_id: ${user.user_id} is already in db`;
            }
            dbConnection.close();
            return msg;
        });
        return response_msg;
    });
});
exports.removeUser = (user_id) => __awaiter(this, void 0, void 0, function* () {
    const db = mongoClient.connect(dbUrl);
    return db.then((dbConnection) => {
        const usr = dbConnection.collection(collectionName).deleteOne({ user_id: user_id });
        dbConnection.close();
        return usr;
    });
});
exports.editUser = (user) => __awaiter(this, void 0, void 0, function* () {
    const db = mongoClient.connect(dbUrl);
    return db.then((dbConnection) => {
        const collection = dbConnection.collection(collectionName);
        const db_user = collection.findOne({ "user_id": user.user_id });
        const response_msg = db_user.then((usr) => {
            let msg;
            if (usr == undefined || usr == null) {
                msg = `There is no such a user with user_id : ${user.user_id}`;
                dbConnection.close();
                throw (new Error(msg));
            }
            else {
                msg = 'Updated user: \n'
                    + JSON.stringify(usr)
                    + '\nwith following data: \n'
                    + JSON.stringify(user);
                collection.updateOne({ "user_id": user.user_id }, { "$set": user }, { "upsert": true });
                dbConnection.close();
                return msg;
            }
        });
        return response_msg;
    });
});
