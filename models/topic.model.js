const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

const topicSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    status: String,
    slug: { 
      type: String, 
      slug: "name",
      unique: true 
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Topic = mongoose.model("Topic", topicSchema, "topics");

module.exports = Topic;