const fs = require('fs');
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');
const localFolderPath = appRoot.path + '/uploads'
let storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        if (_file.fieldname === "profilePhoto") {
            cb(null, localFolderPath);
        }

        if (_file.fieldname === "idProof") {
            cb(null, localFolderPath);
        }
    },
    filename: function (_req, file, cb) {
        // cb(null, Date.now() + file.originalname);
        cb(null, file.originalname);

    },
});

exports.uploadImage = multer({ storage: storage }).fields(
    [{ name: "profilePhoto", maxCount: 1 }, { name: "idProof", maxCount: 1 }]
);
