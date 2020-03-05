const express = require("express");
const router = express.Router();

const model = require("../models/TypeUsers");
const out = require("./Out").Out();

//Ajout d'un type utilisateur
router.post("/add", (req, res) => {
    let entity = require("../models/entities/TypeUsers").Type();

    entity.title = req.body.intitule;

    model.create(entity, (isSign, message, result) => {
        out.state = isSign;
        out.message = message;
        out.result = result;

        res.status(201).send(out);
    })
})

//Récupération de tous les types utilisateurs
router.get("/getAll", (req, res) => {
    model.getAll((isGet, message, result) => {
        out.state = isGet;
        out.message = message;
        out.result = result;

        res.status(201).send(out);
    })
})

module.exports = router;