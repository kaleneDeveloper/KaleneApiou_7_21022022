const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.findAll);
router.get("/:uuid", userCtrl.findOne);

router.put("/profile/:uuid", userCtrl.updateProfile)

module.exports = router;
