const express = require("express");
const multer = require("../middleware/multer-config");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/id/:uuid", auth, userCtrl.findOne);

router.get("/", auth, userCtrl.findAll);

router.get("/token", auth, userCtrl.getToken);

router.put("/profile/:uuid", auth, multer, userCtrl.updateProfile);

module.exports = router;
