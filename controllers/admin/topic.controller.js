const Topic = require("../../models/topic.model");

// [GET] /topics
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

// [GET] /topics/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/topics/create", {
    pageTitle: "Trang tạo mới chủ đề"
  })
}

// [GET] /topics/createPost
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

// [GET] /topics/edit
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const topic = await Topic.findOne({
    _id: id
  })

  res.render("admin/pages/topics/edit", {
    pageTitle: "Trang chỉnh sửa",
    topic: topic
  })
  
}

// [PATCH] /topics/edit
module.exports.editPatch = async (req, res) => {
  const objectTopic = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    avatar: req.body.avatar
  }

  const id = req.params.id;

  try {
    
    await Topic.updateOne({
      _id: id
    }, objectTopic);

    req.flash("success", `Sửa chủ đề thành công!`)
    
  } catch (error) {
    req.flash("error", `Sửa chủ đề thất bại!`)
  }
  
  res.redirect("back");
}