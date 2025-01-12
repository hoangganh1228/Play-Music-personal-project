const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model");
const Singer = require("../../models/singer.model");
const FavoriteSong  = require("../../models/favourite-song.model");
const User = require("../../models/user.model");

// [GET]
module.exports.index = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;
  
  const user = await User.findOne({ tokenUser })
  
  
  if(!user) {
    return res.redirect("/user/login")
  }

  const favoriteSongs = await FavoriteSong.find({
    userId: user.id,
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
