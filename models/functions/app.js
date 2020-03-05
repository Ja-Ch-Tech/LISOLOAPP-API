const admin = require("firebase-admin");
const service = require("../../keyFile.json");


admin.initializeApp({
    credential: admin.credential.cert(service),
    databaseURL: 'https://lisoloapp-project.firebaseio.com'
});

module.exports = admin; 