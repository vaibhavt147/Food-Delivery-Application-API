const { Router } = require("express");
const router = Router();
const partnerController = require("../controllers/partnerController");

router.post("/signup", partnerController.signup);
router.post("/login", partnerController.login);
router.get("/partner", partnerController.getpartnerinfo);
module.exports = router;
