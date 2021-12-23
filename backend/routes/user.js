const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/id/:uuid", userCtrl.findOne);

router.get("/", userCtrl.findAll);

router.get("/token", auth, userCtrl.getToken);

router.put("/profile/:uuid", userCtrl.updateProfile);

module.exports = router;
