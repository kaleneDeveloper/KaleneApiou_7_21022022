const multer = require("multer");
const { json } = require("sequelize/dist");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
};
const maxSize = 8 * 1024 * 1024;
const limits = {
    fileSize: maxSize,
};
const types = Object.keys(MIME_TYPES);
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (types.includes(file.mimetype)) {
            let pathUrl = req.originalUrl.split("/");
            const findOne = pathUrl.find(
                (path) => path === "posts" || path === "profile"
            );
            callback(null, "images/uploads/" + findOne);
        } else {
            return callback(new Error("Invalid file type"));
        }
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        const name = file.originalname.split(" ").join("_");
        const nameEdit = name.split("." + extension).join("");
        callback(null, nameEdit + "_" + Date.now() + "." + extension);
    },
});

module.exports = multer({ limits, storage }).single("file");
