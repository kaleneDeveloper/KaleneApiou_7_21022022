const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let pathUrl = req.originalUrl.split("/");
        const findOne = pathUrl.find(
            (path) => path === "posts" || path === "profile"
        );
        callback(null, "images/uploads/" + findOne);
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        const name = file.originalname.split(" ").join("_");
        const nameEdit = name.split("." + extension).join("");
        callback(null, nameEdit + "_" + Date.now() + "." + extension);
    },
});

module.exports = multer({ storage }).single("file");
