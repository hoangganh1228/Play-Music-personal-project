const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/song.controller");

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

module.exports = router;