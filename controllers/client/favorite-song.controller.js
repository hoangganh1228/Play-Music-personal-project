const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model");
const Singer = require("../../models/singer.model");
const FavoriteSong  = require("../../models/favourite-song.model");

// [GET]
module.exports.index = async (req, res) => {
  const favoriteSongs = await FavoriteSong.find({
    // userId: "",
  });

  for(const item of favoriteSongs) {
    const infoSong = await Song.findOne({
      _id: item.songId
    })

    const infoSinger = await Singer.findOne({
      _id: infoSong.singerId
    });

    item.infoSong = infoSong;
    item.infoSinger = infoSinger;
  }

  res.render("client/pages/favorite-songs/index", {
    pageTitle: "Bài hát yêu thích",
    favoriteSongs: favoriteSongs
  });
}
