const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model");
const Singer = require("../../models/singer.model");
const FavoriteSong  = require("../../models/favourite-song.model");

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
    
    if(infoSinger) {
      song.infoSinger = infoSinger 
    }
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


  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id
  })

  song.isFavoriteSong = favoriteSong

  


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

// [PATCH]
module.exports.favorite = async (req, res) => {
  const idSong = req.params.idSong;
  const typeFavorite = req.params.typeFavorite;

  switch(typeFavorite) {
    case "favorite":
      const existFavoriteSong = await FavoriteSong.findOne({
        songId: idSong
      });

      if(!existFavoriteSong) {
        const record = new FavoriteSong({
          // userId: "",
          songId: idSong
        });
        await record.save();
      }
      break;
    case "unfavorite":
      await FavoriteSong.deleteOne({
        songId: idSong
      });
      break;
    default:
      break;
  }

  res.json({
    code: 200,
    message: "Thành công!"
  });
}