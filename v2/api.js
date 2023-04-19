const express = require("express");
const apiConfig = require("./configs/api.config");

const router = express.Router();

router.use((req, res, next) => {
    const headers = req.headers;

    if (!headers.apikey || headers.apikey !== apiConfig.apiKey) {
        res.status(401).send();
    }
    else {
        next();
    }
})

router.use( (req, res) => {
    res.send(400);
})

module.exports = router;