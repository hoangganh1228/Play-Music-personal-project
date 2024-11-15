const Topic = require("../../models/topic.model");


module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }
  
  const topics = await Topic.find(find);
  

  res.render("admin/pages/topics/index", {
    pageTitle: "Trang quản lí chủ đề",
    topics: topics
  })
}

module.exports.create = async (req, res) => {
  res.render("admin/pages/topics/create", {
    pageTitle: "Trang tạo mới chủ đề"
  })
}