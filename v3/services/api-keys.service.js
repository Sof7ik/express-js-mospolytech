const connectToMongoDB = require("../configs/mongodb.config");
const { ObjectId } = require("mongodb")
const uuid = require("uuid").v4;

let db;
let apiKeyCollection;

connectToMongoDB()
    .then(result => {
        db = result;
        apiKeyCollection = db.collection("api-keys")
    })
    .catch(err => console.log(err))

async function getApiKey(userName) {
    try {
        let apiKeyDoc;

        apiKeyDoc = await apiKeyCollection.findOne({user: userName});

        if (apiKeyDoc === null) {
            const insertRes = await apiKeyCollection.insertOne({
                user: userName,
                apiKey: uuid(),
            });

            if (insertRes.insertedId) {
                apiKeyDoc = await apiKeyCollection.findOne({_id: new ObjectId(insertRes.insertedId)});
            }
        }

        return apiKeyDoc;
    }

    catch (err) {
        throw err;
    }
}
async function deleteApiKey(apiKey) {
    try {
        return await apiKeyCollection.findOneAndDelete({"apiKey": apiKey});
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getApiKey,
    deleteApiKey
}