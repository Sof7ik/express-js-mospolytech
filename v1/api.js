const express = require("express");
const router = express.Router();
const path = require("node:path");

const statsRouter = require("./routes/stats");
const commentsRouter = require("./routes/comments");

router.get("/", (req, res) => {
    // res.status(200)
    //     .header("Content-Type: text/plain")
    //     .send("Hello")

    res.status(200)
        .header("Content-Type: text/html")
        .sendFile(path.resolve(__dirname, "../public/index.html"))
})

router.get("/stats", statsRouter.getStats);
router.get("/comments", commentsRouter.getComments);
router.post("/comments", commentsRouter.addComment);

module.exports = router;