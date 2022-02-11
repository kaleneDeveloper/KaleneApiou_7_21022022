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
            if (file.fieldname === "profile") {
                callback(null, "../images/uploads/profiles/");
            } else if (file.fieldname === "posts") {
                callback(null, "../images/uploads/posts/");
            } else if (file.fieldname === "videos") {
                callback(null, "../images/uploads/videos/");
            }
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

module.exports = multer({ limits, storage }).fields([
    {
        name: "profile",
        maxCount: 1,
    },
    {
        name: "posts",
        maxCount: 4,
    },
    {
        name: "videos",
        maxCount: 1,
    },
]);
