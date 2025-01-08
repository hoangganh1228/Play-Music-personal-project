const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/playlist.controller");

router.get("/", controller.index);

router.get("/detail/:playlistId", controller.list);

module.exports = router;

