const express = require("express");
const path = require("node:path");

const cfg = require("../config.json");

const commentsRouter = require("./routes/comments");

const router = express.Router();

router.use((req, res, next) => {
    const headers = req.headers;

    if (!headers.apikey || headers.apikey !== cfg.apiKey) {
        res.status(401).send();
    }
    else {
        next();
    }
})

router.get("/", (req, res) => {
    res.status(200)
        .header("Content-Type: text/plain")
        .send("Hello ExpressJS");
})

// /v1/comments
router.use("/comments", commentsRouter);

router.use( (req, res) => {
    res.send(400);
})

module.exports = router;