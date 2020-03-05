const express = require("express");
const router = express.Router();

const model = require("../models/Users");
const out = require("./Out").Out();

//Inscription d'un utilisateur
router.post("/register", (req, res) => {
    let entity = require("../models/entities/Users").Users();

    entity.email = req.body.email;
    entity.password = req.body.password;
    entity.type = req.body.type;

    model.register(entity, (isSign, message, result) => {
        out.state = isSign;
        out.message = message;
        out.result = result;

        res.status(201).send(out);
    })
})

//Route pour la connexion
router.post("/login", (req, res) => {
    var log = {
        email: req.body.email,
        password: req.body.password
    };

    model.login(log, (isLogged, message, result) => {
        out.state = isLogged;
        out.message = message;
        out.result = result;

        res.status(201).send(out);
    })
})

module.exports = router;