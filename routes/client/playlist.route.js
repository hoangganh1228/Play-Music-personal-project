const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/playlist.controller");

router.get("/", controller.index);

router.get("/detail/:playlistId", controller.list);

router.get("/play/:playlistId", controller.getPlaylist);


module.exports = router;

