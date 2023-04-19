const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const fs = require("node:fs");
const path = require("node:path");

const restV1 = require("./v1/api");

const port = process.env.PORT || 5500;

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public/")));

// log every query
app.use(morgan("dev"));
app.use(helmet());

// routers
app.use("/v1", restV1);

app.listen(port, "localhost", () => {
    console.log(`Server is running on localhost:${port}`);
})