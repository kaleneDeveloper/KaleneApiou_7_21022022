const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.postCreate);
router.get("/", auth, postCtrl.findAll);
router.get("/:uuid", auth, postCtrl.findOne);
router.put("/:uuid", auth, postCtrl.modifyPost);
router.delete("/:uuid", auth, postCtrl.deletePost);
module.exports = router;
