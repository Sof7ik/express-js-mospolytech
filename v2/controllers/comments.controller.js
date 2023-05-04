const commentsServices = require("../services/comments.services");
const { ObjectId } = require('mongodb');

async function getComments(req, res) {
    let allComments = await commentsServices.findComments()
    res.json(allComments)
}

async function getComment(req, res) {
    if (ObjectId.isValid(req.params.id)) {
        let comment = await commentsServices.findComment(req.params.id)
        res.json(comment)
    } else {
        res.status(404).send("Not Found")
    }
}

function postComments(req, res) {
    const { name, text } = req.body;

    if (!name || !text) {
        res.status(400).send("No data");
        return;
    }

    const date = new Date();

    const month = date.getMonth() > 10 ? date.getMonth() : `0${date.getMonth()}`;

    const dateToDb = `${date.getDate()}.${month}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getHours()}`

    const comment = {
        name, text,
        date: dateToDb,
    }
    commentsServices.insertComment(comment);

    getComments(req, res);

    // res.json();
}

module.exports = {
    getComments,
    postComments,
    getComment
}