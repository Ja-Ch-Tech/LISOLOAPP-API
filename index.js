/**
 * By Ja'Ch Technologies, 04 Mars 2020
 */

const express = require("express");
const api = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3030;

api.use(bodyParser(bodyParser({ extended: false })));
api.use(bodyParser.json());

//Routes definitions
const users = require("./routes/Users");
const typeUsers = require("./routes/TypeUsers");

//Routes Usage
api.use("/api/users", users);
api.use("/api/typeUsers", typeUsers);

api.listen(port, () => {
    console.log(`L'API a demarrer sur le port ${port}`);
})