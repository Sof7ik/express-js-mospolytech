const express = require("express");
const path = require("node:path");

const statsRouter = require("./routes/stats");
const commentsRouter = require("./routes/comments");

const router = express.Router();


router.get("/", (req, res) => {
    res.status(200)
        .header("Content-Type: text/plain")
        .send("Hello ExpressJS");
})

// /v1/stats
router.use("/stats", statsRouter);

// /v1/comments
router.use("/comments", commentsRouter);
router.use( (req, res) => {
    res.send(400);
})

module.exports = router;