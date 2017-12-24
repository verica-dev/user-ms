import { MongoClient } from "mongodb";

const mongoClient = new MongoClient();
const dbUrl = "mongodb://localhost:27017/hairstudio";
const collectionName = 'user';

export class User {
    constructor(
        public user_id: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public phone: string
    ) { }
}

var user: User;

export const getUser = async (user_id: string) => {
    const db = mongoClient.connect(dbUrl);

    return db.then((dbConnection: any): User => {
        const usr = dbConnection.collection(collectionName).findOne({ user_id: user_id });
        dbConnection.close();
        return usr;
    });
}

export const getAllUsers = async () => {
    const db = mongoClient.connect(dbUrl);

    return db.then((dbConnection: any): User[] => {
        const users = dbConnection.collection(collectionName).find({}).toArray();
        dbConnection.close();
        return users;
    });
}

export const addUser = async (user: User) => {
    const db = mongoClient.connect(dbUrl);

    return db.then((dbConnection: any): string => {
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

export const removeUser = async (user_id: string) => {
    const db = mongoClient.connect(dbUrl);

    return db.then((dbConnection: any): User => {
        const usr = dbConnection.collection(collectionName).deleteOne({ user_id: user_id });
        dbConnection.close();
        return usr;
    });
}