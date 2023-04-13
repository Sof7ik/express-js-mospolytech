const express = require("express");
const bodyParser = require("body-parser");
const fs = require("node:fs");
const path = require("node:path");

const restV1 = require("./v1/api");

const port = process.env.PORT || 5500;

function logRequests(userAgent) {
    let requestsJSON = {};

    const requestsDataBuffer = fs.readFileSync( path.join(__dirname, "data/requests.json") );

    if (requestsDataBuffer.length) {
        // throw new Error("Не удалось прочитать файл")
        let requestsData = Buffer.from(requestsDataBuffer).toString();

        if (requestsData) {
            requestsJSON = JSON.parse(requestsData);
        }
    }

    let userAgentFindRes = getRequestDataByUserAgent(requestsJSON, userAgent);

    // если userAgent найден
    if (userAgentFindRes !== -1) {
        if (requestsJSON[userAgent]) {
            requestsJSON[userAgent].requests += 1;
        }
        else {
            requestsJSON[userAgent] = {
                "user-agent": userAgent,
                requests: 1
            };
        }
    }
    // если suerAgent не найден
    else {
        if (typeof requestsJSON !== "object") {
            requestsJSON = {};
        }
        requestsJSON[userAgent] = {
            "user-agent": userAgent,
            requests: 1
        };
    }

    fs.writeFileSync(path.join(__dirname, "data/requests.json"), JSON.stringify(requestsJSON))
}
function getRequestDataByUserAgent(requestData, userAgentName) {
    const keys = Object.keys(requestData);

    return keys.indexOf(userAgentName);
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.resolve(__dirname, "public/")));

// log every query
app.use((req, res, next) => {
    console.log("Log this on each request");

    const userAgent = req.header("user-agent");

    logRequests(userAgent);

    next();
})

// routers
app.use("/v1", restV1);

app.listen(port, "localhost", () => {
    console.log(`Server is running on localhost:${port}`);
})