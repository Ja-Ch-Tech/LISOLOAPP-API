const admin = require("./functions/app");

const db = admin.firestore();
const collection = db.collection("TypeUser");

module.exports = {
    /**
     * Le module de la création de nouveau type d'utilisateur
     * @param {Object} newType Le nouveau type d'utilisateur
     * @param {Function} callback La fonction de retour
     */
    create(newType, callback) {
        try {
            collection.add(newType)
                .then(type => {
                    callback(true, "Le type d'utilisateur a été ajouté")
                })
                .catch(err => {
                    callback(false, "Erreur lors de la création de type user : " + err)
                })

        } catch (exception) {
            callback(false, "Une exception a été lévée lors de l'enregistrement d'un nouveau type d'utilisateur : " + exception)
        }
    },

    /**
     * Le module de récupération de tous les types utilisateurs
     * @param {Function} callback La fonction de retour 
     */
    getAll(callback) {
        try {
            let types = [];
            collection.get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        types.push({
                            id: doc.id,
                            infos: doc.data()
                        })
                    });

                    callback(true, "La liste des utilisateurs", types)
                })
        } catch (exception) {
            callback(false, "Une exception a été lévée lors de la récupération de tous les types : " + exception)
        }
    },

    /**
     * Le module de récupération d'un type users suivant son UID
     * @param {String} id L'identifiant du type users
     * @param {Function} callback La fonction de retour
     */
    findOneById(id, callback) {
        try {
            collection.doc(id).get()
                .then(doc => {
                    if (doc.exists) {
                        callback(true, "Le type existe", doc.data())
                    } else {
                        callback(false, "Ce type d'utilisateur n'existe pas")
                    }
                })
                .catch(err => {
                    callback(false, "Une erreur lors de la récupération d'un type user")
                })
        } catch (exception) {
            callback(false, "Une exception a été lévée : " + exception)
        }
    }
}