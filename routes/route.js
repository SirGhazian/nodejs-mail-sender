const router = require("express").Router();

const { getbill } = require("../controller/appController.js");

/** HTTP Request */
router.post("/getbill", getbill);

module.exports = router;
