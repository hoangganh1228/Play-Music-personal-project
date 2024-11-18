const Song = require("../../models/song.model");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  const songs = await Song.find(find);

  res.render("admin/pages/songs/index", {
    pageTitle: "Trang quản lí bài hát",
    songs: songs
  })
  
}

module.exports.create = async (req, res) => {
  res.render("admin/pages/songs/create", {
    pageTitle: "Trang tạo mới bài hát"
  })
}

module.exports.createPost = async (req, res) => {

  console.log(req.body);
  

  res.send("OK");
}