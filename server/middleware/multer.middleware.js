const Multer = require("multer");
const multer_firebase_storage = require("multer-firebase-storage");
const firebase = require("../services/firebase");

const multer = Multer({
    storage: multer_firebase_storage({ bucketName: process.env.FIREBASE_BUCKET_NAME }, firebase),
    limits: 8 * 1024 * 1024,
});

module.exports = multer;
