const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const path = require("node:path");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("./docs/swagger.json");

// const restV1 = require("./v1/api");
// const restV2 = require("./v2/api");
const restV3 = require("./v3/api");

const port = 5500;

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public/")));

// log every query
app.use(morgan("dev"));
app.use(helmet());

// routers
// app.use("/v1", restV1);
// app.use("/v2", restV2);
app.use("/v3", restV3);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJson)
);

app.listen(port, "localhost", () => {
    console.log(`Server is running on localhost:${port}`);
})