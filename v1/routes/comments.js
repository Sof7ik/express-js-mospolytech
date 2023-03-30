const fs = require("node:fs");
const path = require("node:path");

exports = {
    getComments: function (req, res) {
        fs.readFile(path.join(__dirname, "../../data/comments.json"), (error, content) => {
            if (error) {
                throw error;
            }

            const data = Buffer.from(content).toString();
            const comments = JSON.parse(data);
            const commentsToSend = JSON.stringify(comments);

            res.header("Content-Type: application/json")
                .status(200)
                .send(commentsToSend)
        })
    },
    addComment: function(req, res) {
        let body = req.body;
        const newComment = body;

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

                //console.log("Файл записан");
            })

            res.status(201);
            res.header("Content-Type: application/json");
            res.json(newComment);
        })
    },
}

module.exports = exports;