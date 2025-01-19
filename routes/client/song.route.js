const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/song.controller");

router.get("/", controller.index);

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

router.patch("/like/:typeLike/:idSong", controller.like);

router.patch("/favorite/:typeFavorite/:idSong", controller.favorite);

router.patch("/listen/:idSong", controller.listen);

router.post("/create/playlist", controller.playlistCreate);

router.get("/playlists/list", controller.getPlaylists);

router.post("/playlists/add-to-playlist", controller.addToPlaylist);

module.exports = router;