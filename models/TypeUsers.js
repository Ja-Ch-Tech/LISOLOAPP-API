const admin = require("./functions/app");

const db = admin.firestore();
const collection = db.collection("TypeUser");

module.exports = {
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