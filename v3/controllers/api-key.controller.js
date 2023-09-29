const apiKeyServices = require("../services/api-keys.service");

async function getApiKey(req, res, next) {
    const {userName} = req.body;

    if (!userName) {
        res.statusCode = 400;
        const err = new Error("Не передано имя пользователя");
        next(err);
    }

    if (typeof userName !== "string") {
        res.statusCode = 400;
        const err = new Error("Имя пользователя должно быть типа \"строка\"");
        next(err);
    }

    try {
        const apiKey = await apiKeyServices.getApiKey(userName)
        res.json(apiKey);
    }
    catch (err) {
        res.statusCode = 500;
        next(err);
    }
}

async function deleteApiKey(req, res, next) {
    const apiKey = req.headers.apikey;

    if (!apiKey) {
        const err = new Error("Не передан API ключ");
        res.statusCode = 401;
       next(err);
    }
    else {
        try {
            const deletedApiKey = await apiKeyServices.deleteApiKey(apiKey);
            res.json(deletedApiKey);
        }
        catch (err) {
            res.statusCode = 500;
            next(err);
        }
    }
}

module.exports = {
    deleteApiKey,
    getApiKey
}