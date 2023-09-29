function errorLogger(err, req, res, next) {
    console.error("Произошла ошибка:", err);
    res.end();
    return;
}

module.exports = {
    errorLogger,
}