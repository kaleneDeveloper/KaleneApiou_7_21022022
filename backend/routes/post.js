const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.post("/", multer, postCtrl.postCreate);
router.get("/", postCtrl.findAll);
router.get("/:uuid", postCtrl.findOne);
router.delete("/:uuid", postCtrl.deletePost);
router.put("/:uuid", multer, postCtrl.updatePost);
module.exports = router;
