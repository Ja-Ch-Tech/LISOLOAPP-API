const admin = require("./functions/app");
const typeUser = require("./TypeUsers");
const bcrypt = require("bcryptjs");

const db = admin.firestore();
const collection = db.collection("User");

module.exports = {
    /**
     * Le module d'inscription de l'utilisateur
     * @param {Object} newUser Le nouvel utilisateur
     * @param {Function} callback La fonction de retour
     */
    register(newUser, callback) {
        try {
            typeUser.findOneById(newUser.type, (isFound, message, result) => {
                if (isFound) {
                    admin.auth().createUser(newUser)
                        .then(userRecord => {
                            var clearPswd = `Lisolo${newUser.password}App`;

                            bcrypt.hash(clearPswd, 10, (err, hashed) => {
                                if (err) {
                                    callback(false, "Erreur lors du hashage du mot de passe : " + err)
                                } else {
                                    newUser.password = hashed;
                                    collection.doc(userRecord.uid).set({ email: newUser.email, created_at: new Date(), type: newUser.type, hashed: newUser.password })
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
                                }
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

    /**
     * Le module de connexion de l'utilisateur
     * @param {Object} log L'objet de connexion
     * @param {Function} callback La fonction de retour
     */
    login(log, callback) {
        try {

            admin.auth().getUserByEmail(log.email)
                .then(userRecord => {
                    this.findOneById(userRecord.uid, (isFound, message, resultWithInfos) => {
                        if (isFound) {
                            var clearPswd = `Lisolo${log.password}App`;

                            bcrypt.compare(clearPswd, resultWithInfos.hashed, (err, success) => {
                                if (err) {
                                    callback(false, "Une erreur est survenue lors du decryptage de mot de passe : " + err)
                                } else {
                                    typeUser.findOneById(resultWithInfos.type, (isFound, message, result) => {
                                        if (isFound) {
                                            var objet = {
                                                id: userRecord.uid,
                                                type: result.title
                                            };

                                            callback(true, `L'utilisateur est connecté en tant que ${objet.type}`, objet)
                                        } else {
                                            callback(false, "Cet utilisateur n'a pas de type")
                                        }
                                    })
                                }
                            })
                        } else {
                            callback(false, message)
                        }
                    })

                })
        } catch (exception) {
            callback(false, "Une exception a été lévée lors de la recherche de connexion de l'utilisateur : " + exception)
        }
    },

    /**
     * Module permettant la recherche d'un user via son UID
     * @param {String} id L'identifiant de l'utilisateur correspond à son UID
     * @param {Function} callback La fonction de retour
     */
    findOneById(id, callback) {
        try {
            collection.doc(id).get()
                .then(doc => {
                    if (doc.exists) {
                        callback(true, "Les infos de l'utilisateur", doc.data())
                    } else {
                        callback(false, "Cette utilisateur n'existe pas")
                    }
                })
                .catch(err => {
                    callback(false, "Une erreur lors de la récupération du user")
                })
        } catch (exception) {
            callback(false, "Une exception a été lévée : " + exception)
        }
    },
}