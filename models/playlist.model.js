const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    title: String, // Tên danh sách phát
    avatar: {
      type: String,
      default: "http://res.cloudinary.com/dnczc3gzn/image/upload/v1737274547/x1o3dmq55ntiox4iqjel.jpg",
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }, // Liên kết với bảng User
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    status: { 
      type: String, 
      default: "public" // public, private
    }, 
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true, // Lưu thời gian tạo và cập nhật
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema, "playlists");

module.exports = Playlist;
