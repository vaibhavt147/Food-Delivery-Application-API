const { Router } = require("express");
const homepagecontroller = require("../controllers");
const router = Router();

router.get("/", homepagecontroller.helloWorld);

module.exports = router;
