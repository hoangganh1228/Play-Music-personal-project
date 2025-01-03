const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    title: String, // Tên danh sách phát
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }, // Liên kết với bảng User
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
