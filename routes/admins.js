const express = require("express");
const router = express.Router();
const adminsController = require("../controllers/admins");

router.post("/login", adminsController.login);
//router.post("/create", adminsController.create);

module.exports = router;
