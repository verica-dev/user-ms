import { MongoClient } from "mongodb";

const mongoClient = new MongoClient();
const dbUrl = "mongodb://localhost:27017/hairstudio";
const collectionName = 'user';

var user: Object;

export const getUser = async (user_id: string) => {
    const db = mongoClient.connect(dbUrl);

    return db.then((dbConnection: any): Object => {
        console.log('dbConnection : ' + dbConnection);
        console.log('user_id : ' + user_id);
        const usr = dbConnection.collection(collectionName).findOne({ user_id: user_id });
        dbConnection.close();
        return usr;
    });
}

export const getAllUsers = async () => {
    const db = mongoClient.connect(dbUrl);

    return db.then((dbConnection: any): Object => {
        console.log('dbConnection : ' + dbConnection);
        const users = dbConnection.collection(collectionName).find({}).toArray();
        dbConnection.close();
        return users;
    });
}

class User {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

export const addUser = async (user: User) => {
    const db = mongoClient.connect(dbUrl);

    return db.then((dbConnection: any): string => {
        console.log('dbConnection : ' + dbConnection);
        
        const collection = dbConnection.collection(collectionName);
        const db_user = collection.findOne({ "user_id": user.user_id });
        
        const response_msg: string = db_user.then((usr: User): string => {
            let msg: string;
            if (usr == undefined) {
                msg = 'added new user: ' + JSON.stringify(user);
                collection.insertOne(user);
            } else {
                msg = `user with user_id: ${user.user_id} is already in db`;
            }
            dbConnection.close();
            return msg;
        });
        return response_msg;
    });
}