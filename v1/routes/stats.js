const fs = require("node:fs");
const path = require("node:path");

exports = {
    getStats: function (req, res) {
        fs.readFile( path.join(__dirname, "../../data/requests.json"), (err, requestsData) => {
            if (err) {
                throw err;
            }

            requestsData = Buffer.from(requestsData).toString();

            // console.log("readed from file", requestsData)

            if (requestsData) {
                requestsData = JSON.parse(requestsData);
            }
            else {
                throw new Error("Ошибка при чтении из файла");
            }

            let HTMLTable = `
                        <meta charset="utf-8">
                        <style>
                            table tr td:first-child {
                                max-width: 400px;
                            }
                        </style>
                        <table>
                            <thead>
                                <tr>
                                    <th>User-agent</th>
                                    <th>Количество запросов</th>
                                </tr>
                            </thead>
                        
                            <tbody>`;

            for (const userAgent in requestsData) {
                const requestObject = requestsData[userAgent];

                HTMLTable += `
                    <tr>
                        <td>${requestObject["user-agent"]}</td>
                        <td>${requestObject.requests}</td>
                    </tr>
                    `
            }

            HTMLTable+= `
                        </tbody>
                    </table>
                    `;

            res.header("Content-Type: text/html")
                .status(200)
                .send(HTMLTable)
        })
    },

};

module.exports = exports;