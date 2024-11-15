const Topic = require("../../models/topic.model");


module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }
  
  const topics = await Topic.find(find);
  

  res.render("admin/pages/topics/index", {
    pageTitle: "Trang chu de",
    topics: topics
  })
}