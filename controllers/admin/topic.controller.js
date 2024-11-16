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

module.exports.createPost = async (req, res) => {
  try {
    
    const objectTopic = new Topic({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      avatar: req.body.avatar
    })  
  
    objectTopic.save();
    req.flash("success", `Thêm chủ đề thành công!`)
  } catch (error) {
    req.flash("error", `Thêm chủ đề thất bại!`)
  }
  
  res.redirect(req.get("Referrer") || "/");
  
}