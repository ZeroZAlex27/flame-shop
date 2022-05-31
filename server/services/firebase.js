const firebase_admin = require("firebase-admin");
const service_account = require("../services/firebase-key.json");

const firebase_instance = firebase_admin.initializeApp({
    credential: firebase_admin.credential.cert(service_account),
    storageBucket: process.env.FIREBASE_BUCKET,
});

module.exports = firebase_instance;
