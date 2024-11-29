const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model");
const Singer = require("../../models/singer.model");

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

// [GET]
module.exports.create = async (req, res) => {
  const topics = await Topic.find({
    deleted: false
  }).select("title");

  const singers = await Singer.find({
    deleted: false
  }).select("fullName")

  res.render("admin/pages/songs/create", {
    pageTitle: "Trang tạo mới bài hát",
    topics: topics,
    singers: singers
  })
}

// [POST]
module.exports.createPost = async (req, res) => {
  
  try {
    
    const objectSong = new Song({
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      lyrics: req.body.lyrics,
      description: req.body.description,
      status: req.body.status,
      avatar: req.body.avatar,
      audio: req.body.audio,
    })  
  
    objectSong.save();
    req.flash("success", `Thêm bài hát thành công!`)
  } catch (error) {
    req.flash("error", `Thêm bài hát thất bại!`)
  }
  
  res.redirect("back");
  
}

// [GET]
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const song = await Song.findOne({
    _id: id
  });

  const topics = await Topic.find({
    deleted: false
  }).select("title");

  const singers = await Singer.find({
    deleted: false
  }).select("fullName");

  res.render("admin/pages/songs/edit", {
    pageTitle: "Trang chỉnh sưa bài hát",
    song: song,
    topics: topics,
    singers: singers
  })
}

// [PATCH]
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    
    const objectSong = {
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      lyrics: req.body.lyrics,
      description: req.body.description,
      status: req.body.status,
      avatar: req.body.avatar,
      audio: req.body.audio,
    }

    await Song.updateOne({
      _id: id
    }, objectSong);

    req.flash("success", `Sửa bài hát thành công!`)
  } catch (error) {
    req.flash("error", `Sửa bài hát thất bại!`)
  }

  res.redirect("back");
}

// [DELETE]
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
  
    await Song.updateOne({
      _id: id
    }, {
      deleted: true
    }); 
    req.flash("success", `Xóa bài hát thành công!`)

  } catch (error) {
    req.flash("error", `Xóa bài hát thất bại!`)
  }
  

  res.redirect("back");
}

// []