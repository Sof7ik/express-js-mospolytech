function checkApiKey(req, res, next) {
    const apiKey = req.headers.apikey;

    if (!apiKey) {
        const err = new Error("Не передан ключ API");
        res.statusCode = 401;
        next(err);
    }
    else {
        next();
    }
}

module.exports = {
    checkApiKey
}