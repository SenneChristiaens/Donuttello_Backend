const express = require("express");
const router = express.Router();
const donutsController = require("../controllers/donuts");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, donutsController.getAllDonuts);
router.get("/:id", donutsController.getDonutById);
router.post("/create", donutsController.create);
router.put("/:id", authenticate, donutsController.updateDonutById);
router.delete("/:id", authenticate, donutsController.deleteDonutById);

module.exports = router;
