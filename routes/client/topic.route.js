const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/topic.controller");

router.get("/", controller.index);

module.exports = router;