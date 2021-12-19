const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", multer, postCtrl.postCreate);
router.get("/", multer, postCtrl.findAll);
router.get("/:uuid", multer, postCtrl.findOne);

module.exports = router;
