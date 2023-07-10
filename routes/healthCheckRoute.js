const { Router } = require("express");
const controller = require("../controllers/index");
const router = Router();

router.get("/", controller.healthcheck);

module.exports = router;
