function errorLogger(err, req, res) {
    console.error("Произошла ошибка:", err);
    res.end();
}

module.exports = {
    errorLogger,
}