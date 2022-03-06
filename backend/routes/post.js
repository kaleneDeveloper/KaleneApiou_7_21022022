const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.post("/", auth, multer, postCtrl.postCreate);
router.get("/", auth, postCtrl.findAll);
router.get("/id/:uuid", auth, postCtrl.findOne);
router.delete("/:uuid", auth, postCtrl.deletePost);
router.put("/id/:uuid", auth, multer, postCtrl.updatePost);

module.exports = router;
