// repository.js
'use strict'

const repository = (db) => {

    const collection = db.collection('user')
    const projection = { _id: 0, id: 1, first_name: 1, last_name: 1, email: 1, phone: 1 }

    const getAllUsers = () => {
        return new Promise((resolve, reject) => {

            const users = []

            const cursor = collection.find({}, projection)

            const addUser = (user) => {
                users.push(user)
            }

            const sendUsers = (err) => {
                if (err) {
                    reject(new Error('An error occured fetching users' + err))
                }
                resolve(users)
            }

            cursor.forEach(addUser, sendUsers)
        })
    }

    const getUserById = (user_id) => {
        return new Promise((resolve, reject) => {

            const sendUser = (err, user) => {
                if (err) {
                    reject(new Error(`An error occured while fetching a user with id : ${id}, err : ${err}`))
                }
                resolve(user)
            }

            collection.findOne({ id: user_id }, projection, user)
        })
    }

    const disconnect = () => {
        db.close()
    }

    return Object.create({
        getAllUsers,
        getUserById,
        disconnect
    })
}

const connect = (connection) => {
    return new Promise((resolve, reject) => {
        if (!connection) {
            reject(new Error('connection db not supplied'))
        }
        resolve(repository(connection))
    })
}

module.exports = Object.assign({}, { connect })