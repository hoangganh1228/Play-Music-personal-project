const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model")

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
  const topics = await Topic.find({
    deleted: false
  }).select("title");

  res.render("admin/pages/songs/create", {
    pageTitle: "Trang tạo mới bài hát",
    topics: topics
  })
}

module.exports.createPost = async (req, res) => {
  
  try {
    
    const objectSong = new Song({
      title: req.body.title,
      topicId: req.body.topicId,
      lyrics: req.body.lyrics,
      description: req.body.description,
      status: req.body.status,
      avatar: req.body.avatar,
      audio: req.body.audio
    })  
  
    objectSong.save();
    req.flash("success", `Thêm bài hát thành công!`)
  } catch (error) {
    req.flash("error", `Thêm bài hát thất bại!`)
  }
  
  res.redirect("back");
  
}