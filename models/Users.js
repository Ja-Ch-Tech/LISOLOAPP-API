const admin = require("./functions/app");
const typeUser = require("./TypeUsers");

const db = admin.firestore();
const collection = db.collection("User");

module.exports = {
    /**
     * Initialisation de la collection
     * @param {String} db Database Firestore
     */
    register(newUser, callback) {
        try {
            typeUser.findOneById(newUser.type, (isFound, message, result) => {
                if (isFound) {
                    admin.auth().createUser(newUser)
                        .then(userRecord => {
                            collection.doc(userRecord.uid).set({ email: newUser.email, created_at: new Date(), type: newUser.type })
                                .then(user => {
                                    var objet = {
                                        id_user: userRecord.uid,
                                        type: result.title
                                    };

                                    callback(true, "Insertion de l'utilisateur", objet)
                                })
                                .catch(err => {
                                    callback(false, "Aucun enregistrement")
                                })
                        })
                        .catch(err => {
                            if (err.code == "auth/email-already-exists") {
                                callback(false, "Cet adresse email a déjà été utilisé")
                            } else {
                                callback(false, "Erreur lors de la création de l'utilisateur")
                            }
                        })
                } else {
                    callback(false, message)
                }
            })

        } catch (exception) {
            callback(false, "Une exception a été lévée : " + exception)
        }
    },
}