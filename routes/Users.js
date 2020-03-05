const express = require("express");
const router = express.Router();

const model = require("../models/Users");

router.get("/getAll", (req, res) => {

    model.initialize(db);
    model.getAll((isGet, message, result) => {
        res.status(200).send(result)
    })
})

router.post("/register", (req, res) => {
    let entity = require("../models/entities/Users").Users();

    entity.email = req.body.email;
    entity.password = req.body.password;
    entity.type = req.body.type;

    model.register(entity, (isSign, message, result) => {
        res.status(201).send({ getEtat: isSign, getMessage: message, getObjet: result })
    })
})

module.exports = router;