const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model");
const Singer = require("../../models/singer.model");
const FavoriteSong  = require("../../models/favourite-song.model");
const User = require("../../models/user.model");
const Playlist = require("../../models/playlist.model");
// const PlaylistSong = require("../../models/playlist-song.model");
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

  // console.log(slugTopic);
  

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

  const tokenUser = req.cookies.tokenUser;
    
  const user = await User.findOne({ tokenUser });

  let playlists = [];

  if(user) {
    playlists = await Playlist.find({ userId: user._id });

    playlists.forEach((playlist) => {
      playlist.isChecked = playlist.songs.includes(song._id.toString())
    })
  }

  

  

  if(slugSong) {
    find.slug = slugSong;
  }


  res.render("client/pages/songs/detail", {
    pageTitle: song.title,
    song: song,
    singer: singer,
    topic: topic,
    playlists: playlists
  });
}

// [PATCH]
module.exports.like = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;

  const user = await User.findOne({ tokenUser })
  
  
  if(!user) {
    return res.status(401).json({
      code: 401,
      message: "Người dùng chưa đăng nhập!",
    });
  }
  
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
  
  const tokenUser = req.cookies.tokenUser;
  
  const user = await User.findOne({ tokenUser })
  
  if(!user) {
    return res.status(401).json({
      code: 401,
      message: "Người dùng chưa đăng nhập!",
    });
  }

  const idSong = req.params.idSong;
  const typeFavorite = req.params.typeFavorite;

  switch(typeFavorite) {
    case "favorite":
      const existFavoriteSong = await FavoriteSong.findOne({
        songId: idSong
      });

      if(!existFavoriteSong) {
        const record = new FavoriteSong({
          userId: user.id,
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

// [PATCH]
module.exports.listen = async (req, res) => {
  const idSong = req.params.idSong;

  const song = await Song.findOne({
    _id: idSong
  });

  const listen = song.listen + 1;

  await Song.updateOne({
    _id: idSong
  }, {
    listen: listen
  });

  const songNew = await Song.findOne({
    _id: idSong
  });

  res.json({
    code: 200,
    message: "Thành công!",
    listen: songNew.listen
  });

}

// [POST]
module.exports.playlistCreate = async (req, res) => {
  try {
    const { title, status } = req.body;
    
    const tokenUser = req.cookies.tokenUser;
    const user = await User.findOne({
      tokenUser: tokenUser
    });  

    if(!user) {
      return res.status(401).json({
        code: 401,
        message: "Người dùng chưa đăng nhập!",
      });
    }
    
    
    const objectPlaylist = new Playlist({
      title: title,
      status: status,
      userId: user.id
    })
    objectPlaylist.save();

    res.json({
      code: 200,
      message: "Thanh cong!",
     })
  } catch (error) {
    res.json({
      code: 500 ,
      message: "Khong thanh cong!",
    })
  }
  

}

// [GET]
module.exports.getPlaylists = async (req, res) => {
  try {
    const tokenUser = req.cookies.tokenUser;
    const user = await User.findOne({ tokenUser });
  
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "Người dùng không hợp lệ!",
      });
    }
  
    const playlists = await Playlist.find({ userId: user._id });
    // console.log(playlists);
    
    res.json({
      code: 200,
      playlists: playlists,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách playlist:", error);
    res.status(500).json({
      code: 500,
      message: "Lỗi server!",
    });
  }
}

// [POST]
module.exports.addToPlaylist = async (req, res) => {
  try {
    const { songId, playlistIds } = req.body;
    if (!songId || !playlistIds || playlistIds.length === 0) {
      return res.status(400).json({
        code: 400,
        message: "Dữ liệu không hợp lệ!",
      });
    }

    const operations = playlistIds.map(async (playlistId) => {
      
      await Playlist.findByIdAndUpdate(
        playlistId,
        { $addToSet: { songs: songId } }, // $addToSet để tránh trùng lặp
        { new: true }
      );
    })

    await Promise.all(operations);

    res.json({
      code: 200,
      message: "Thêm bài hát vào danh sách phát thành công!",
    });

  } catch (error) {
    console.error("Lỗi thêm bài hát vào danh sách phát:", error);
    res.status(500).json({
      code: 500,
      message: "Lỗi server!",
    });
  }
}