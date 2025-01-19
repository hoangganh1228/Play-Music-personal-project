// const mongoose = require("mongoose");

// const playlistSongSchema = new mongoose.Schema(
//   {
    
//     playlistId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Playlist",
//     },
//     songId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Song",
//     },
//     deleted: {
//       type: Boolean,
//       default: false,
//     },
//     deletedAt: Date,
//   },
//   {
//     timestamps: true, // Lưu thời gian thêm bài hát vào danh sách phát
//   }
// );

// const PlaylistSong = mongoose.model("PlaylistSong", playlistSongSchema, "playlist-songs");

// module.exports = PlaylistSong;