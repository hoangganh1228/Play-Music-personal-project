const Topic = require("../../models/topic.model");

module.exports.index = async (req, res) => {
  const topics = await Topic.find({
    status: "active",
    deleted: false
  })

  res.render("client/pages/topics/index", {
    pageTitle: "Chủ đề bài hát",
    topics: topics
  })
}