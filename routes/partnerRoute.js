const { Router } = require("express");
const router = Router();
const partnerController = require("../controllers/partnerController");

router.post("/signup", partnerController.signup);

module.exports = router;
