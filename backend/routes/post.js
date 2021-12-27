const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", multer, postCtrl.postCreate);
router.get("/", postCtrl.findAll);
router.get("/:uuid", postCtrl.findOne);
router.put("/:uuid", postCtrl.modifyPost);
module.exports = router;
