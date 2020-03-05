const express = require("express");
const router = express.Router();

const model = require("../models/TypeUsers");

router.post("/add", (req, res) => {
    let entity = require("../models/entities/TypeUsers").Type();

    entity.title = req.body.intitule;

    model.create(entity, (isSign, message, result) => {
        res.status(201).send({ getEtat: isSign, getMessage: message, getObjet: result })
    })
})

router.get("/getAll", (req, res) => {
    model.getAll((isGet, message, result) => {
        res.status(200).send({ getEtat: isGet, getMessage: message, getObjet: result })
    })
})

module.exports = router;