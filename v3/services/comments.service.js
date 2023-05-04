const { ObjectId } = require('mongodb');
const connectToMongoDB = require('../configs/mongodb.config')

let db;

connectToMongoDB()
    .then(result => db = result)
    .catch(err => {
        throw err;
        // console.log(err)
    })

async function insertComment(data) {
    try {
        const comments = db.collection("comments");
        return await comments.insertOne(data);
    }
    catch (err) {
        throw err;
    }
}

async function findComments() {
    try {
        const comments = db.collection("comments");
        const result = await comments.find();
        return result.toArray();
    }
    catch (err) {
        throw err;
    }
}

async function findComment(id) {
    try {
        const comments = db.collection("comments");
        return await comments.findOne({_id: new ObjectId(id)});
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    insertComment,
    findComments,
    findComment
}