const express = require("express");
const router = express.Router();
const adminsController = require("../controllers/admins");

router.post("/login", adminsController.login);
//router.post("/create", adminsController.create);

router.put("/changepassword", adminsController.changePassword);

module.exports = router;
