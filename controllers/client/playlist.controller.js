const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model");
const Singer = require("../../models/singer.model");
const User = require("../../models/user.model");
const Playlist = require("../../models/playlist.model");
// const PlaylistSong = require("../../models/playlist-song.model");

module.exports.index = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;
  const user = await User.findOne({ tokenUser });

  if(!user) {
    res.redirect("/user/login")
  }

  const playlists = await Playlist.find({ userId: user._id });

  res.render("client/pages/playlists/index", {
    playlists: playlists
  });
}


module.exports.list = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findById(playlistId)
      .populate("songs")
      .select("title songs");

    if (!playlist) {
      return res.status(404).json({
        code: 404,
        message: "Playlist không tồn tại!",
      });
    }

    const songs = playlist.songs;


    for(const song of songs) {
      const infoSinger  = await Singer.findOne({
        _id: song.singerId,
        deleted: false
      }).select("fullName").limit(10);
      
      if(infoSinger) {
        song.infoSinger = infoSinger 
      }
    }
    
    res.render("client/pages/playlists/list", {
      pageTitle: playlist.title,
      songs: songs,
      playlistId: playlistId
    });

    
  } catch (error) {
    
  }
}

module.exports.getPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;


    const playlist = await Playlist.findById(playlistId).populate('songs');

    if (!playlist) {
      return res.status(404).json({
        code: 404,
        message: 'Playlist không tồn tại!',
      });
    }

    const songs = playlist.songs;

    for(const song of songs) {
      const infoSinger  = await Singer.findOne({
        _id: song.singerId,
        deleted: false
      }).select("fullName");
      
      if(infoSinger) {
        song.infoSinger = infoSinger 
      }
    }


    res.json({
      code: 200,
      playlist: {
        title: playlist.title,
        songs: songs.map((song) => ({
          name: song.title,
          artist: song.infoSinger ? song.infoSinger.fullName : 'Không rõ',
          url: song.audio,
          cover: song.avatar,
        })),
      },
    });
  } catch (error) {
    console.error('Lỗi lấy playlist:', error);
    res.status(500).json({
      code: 500,
      message: 'Lỗi server!',
    });
  }
}
