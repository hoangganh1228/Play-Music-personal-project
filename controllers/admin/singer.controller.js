const Singer = require("../../models/singer.model");

// [GET]
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  const singers = await Singer.find(find);

  res.render("admin/pages/singers/index", {
    pageTitle: "Trang quản lí ca sĩ",
    singers: singers
  })

}

// [GET]
module.exports.create = async (req, res) => {
  res.render("admin/pages/singers/create", {
    pageTitle: "Trang tạo mới ca sĩ",
  })
}

// [POST]
module.exports.createPost = async (req, res) => {
  try {
    const objectSinger = new Singer({
      fullName: req.body.fullName,
      status: req.body.status,
      avatar: req.body.avatar,
    })  
  
    objectSinger.save();
    req.flash("success", `Thêm ca sĩ thành công!`)
  } catch (error) {
    req.flash("error", `Thêm ca sĩ thất bại!`)
  }

  res.redirect("back");
  
}
