const commentsServices = require("../services/comments.service");
const { ObjectId } = require('mongodb');

async function getComments(req, res, next) {
    try {
        let allComments = await commentsServices.findComments()
        res.json(allComments)
    }
    catch (err) {
        res.statusCode = 500;
        next(err)
    }
}

async function getComment(req, res, next) {
    if (!req.params.id) {
        const err = new Error("Не передан ID");
        res.statusCode = 400;
        next(err);
    }

    if (ObjectId.isValid(req.params.id)) {
        try {
            let comment = await commentsServices.findComment(req.params.id)
            res.json(comment)
        }
        catch (err) {
            res.statusCode = 500;
            next(err);
        }
    } else {
        res.statusCode = 404;
        const err = new Error("Не валидный ID");
        next(err);
    }
}

async function postComments(req, res, next) {
    const { name, text } = req.body;

    if (!name || !text) {
        res.statusCode = 400;
        const err = new Error("Не передано имя или ID");
        next(err);
    }

    const date = new Date();

    const month = date.getMonth() > 10 ? date.getMonth() : `0${date.getMonth()}`;

    const dateToDb = `${date.getDate()}.${month}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getHours()}`

    const comment = {
        name, text,
        date: date,
    }

    try {
        const insertRes = await commentsServices.insertComment(comment);

        // добавление в БД успешно
        if (insertRes.insertedId) {
            getComments(req, res);
        }
        else {
            throw new Error("Ошибка при добавлении в БД");
        }
    }
    catch (err) {
        res.statusCode = 500;
        next(err);
    }
}

module.exports = {
    getComments,
    postComments,
    getComment
}