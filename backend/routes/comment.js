const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", auth, commentCtrl.findAll);
router.get("/id/:uuid", auth, commentCtrl.findOne);
router.post("/", multer, commentCtrl.commentCreate);

module.exports = router;
