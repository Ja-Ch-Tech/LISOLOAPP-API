var bcrypt = require("bcryptjs");

module.exports = {
    generateID(callback) {
        let docID = Math.floor(Math.random() * (999999 - 000000));

        callback(true, "ID Généré", docID)
    }
}