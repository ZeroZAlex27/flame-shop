const uuid = require("uuid");
const firebase = require("../services/firebase");

class MultipartController {
    async upload(file) {
        const file_name = uuid.v4() + ".jpg";

        const bucket = firebase.storage().bucket(process.env.FIREBASE_BUCKET);
        bucket.file(file.originalname).rename(file_name);

        return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${file_name}?alt=media`;
    }
}

module.exports = new MultipartController();
