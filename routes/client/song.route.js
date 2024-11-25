const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/song.controller");

router.get("/:slugTopic", controller.list);

module.exports = router;