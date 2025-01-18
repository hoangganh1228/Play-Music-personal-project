const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model");
const Singer = require("../../models/singer.model");
const FavoriteSong  = require("../../models/favourite-song.model");
const User = require("../../models/user.model");
const Playlist = require("../../models/playlist.model");
const { favorite } = require("./song.controller");

// [GET] 
module.exports.index = async(req, res) => {
  const find = {
    status: "active",
    deleted: false
  }

  const topics = await Topic.find(find).limit(4);
  
  const topViewSongs = await Song.find(find).sort( {listen: -1} ).limit(4)

  const newestSong  = await Song.find(find).sort({ createdAt: -1 }).limit(8)

  const topLikedSongs = await Song.find(find).sort( {like: -1} ).limit(10)
  
  for(const song of topLikedSongs) {
    
    const infoSinger  = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    }).select("fullName");
    
    if(infoSinger) {
      song.infoSinger = infoSinger 
    }
    
    
  }

  

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    topics: topics,
    topViewSongs: topViewSongs,
    newestSong: newestSong,
    topLikedSongs: topLikedSongs
  })
}