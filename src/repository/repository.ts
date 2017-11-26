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