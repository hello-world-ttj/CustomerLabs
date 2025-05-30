const express = require("express");
const router = express.Router();
const data_controller = require("../controllers/data.controller");

router.route("/incoming_data").post(data_controller.incoming_data_call);

module.exports = router;
