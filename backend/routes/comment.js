const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.get("/", auth, commentCtrl.findAll);
router.get("/id/:uuid", commentCtrl.findOne);
router.post("/", auth, multer, commentCtrl.commentCreate);
router.delete("/:uuid", auth, commentCtrl.commentDelete);
router.put("/:uuid", multer, commentCtrl.commentUpdate);
module.exports = router;
