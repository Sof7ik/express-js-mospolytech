const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "../../data/comments.json"), (error, content) => {
        if (error) {
            throw error;
        }

        const data = Buffer.from(content).toString();
        const comments = JSON.parse(data);

        const commentsToSend = JSON.stringify(comments);

        res.header("Content-Type: application/json")
            .status(200)
            .send(commentsToSend);
    })
})

router.get("/:id", (req, res) => {
    if (!req.params.id) {
        res.status(400).send("No ID");
    }

    fs.readFile(path.join(__dirname, "../../data/comments.json"), (error, content) => {
        if (error) {
            throw error;
        }

        const data = Buffer.from(content).toString();
        const comments = JSON.parse(data);

        const commentToSend = comments.filter(commentObj => commentObj.id = req.params.id);

        res.status(200).json(commentToSend);
    })
})

router.post("/", (req, res) => {
    const newComment = req.body;

    fs.readFile(path.join(__dirname, "../../data/comments.json"), (error, content) => {
        if (error) {
            throw error;
        }

        const data = Buffer.from(content).toString();
        const comments = JSON.parse(data);

        newComment.dateCreated = new Date();

        comments.push(newComment)

        const commentsToWrite = JSON.stringify(comments);

        fs.writeFile( path.join(__dirname, "../../data/comments.json"), commentsToWrite, err => {
            if (err) {
                throw err;
            }
        })

        res.status(201);
        res.header("Content-Type: application/json");
        res.json(newComment);
    })
})

module.exports = router;