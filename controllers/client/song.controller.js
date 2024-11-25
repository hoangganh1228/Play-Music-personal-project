const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model");
const Singer = require("../../models/singer.model");

// [GET]
module.exports.list = async (req, res) => {
  const find = {
    status: "active",
    deleted: false
  }

  const slugTopic = req.params.slugTopic;

  const topic = await Topic.findOne({
    slug: slugTopic,
    deleted: false
  })

  if(slugTopic) {
    find.topicId = topic.id
  }

  const songs = await Song.find(find);

  for(const song of songs) {
    const infoSinger  = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    }).select("fullName");
    song.infoSinger = infoSinger 
  }


  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    songs: songs
});
}

// [GET]
module.exports.detail = async (req, res) => {
  const slugSong = req.params.slugSong;

  const find = {
    status: "active",
    deleted: false
  }

  if(slugSong) {
    find.slug = slugSong;
  }

  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false
  })

  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false
  }).select("fullName")

  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false
  }).select("title");


  res.render("client/pages/songs/detail", {
    pageTitle: song.title,
    song: song,
    singer: singer,
    topic: topic
  });
}

// [PATCH]
module.exports.like = async (req, res) => {
  const typeLike = req.params.typeLike;
  const idSong = req.params.idSong;

  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false
  })

  const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;

  await Song.updateOne({
    _id: idSong
  }, {
    like: newLike
  })

  res.json({
    code: 200,
    message: "Thanh cong!",
    like: newLike
  })
}