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

// [GET]
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const singer = await Singer.findOne({
    _id: id
  });

  res.render("admin/pages/singers/edit", {
    pageTitle: "Trang chỉnh sửa ca sĩ",
    singer: singer
  })
}

// [PATCH]
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    const objectSinger = {
      title: req.body.fullName,
      status: req.body.status,
      avatar: req.body.avatar,
    }

    await Singer.updateOne({
      _id: id
    }, objectSinger);

    req.flash("success", `Sửa ca sĩ thành công!`)
  } catch (error) {
    req.flash("error", `Sửa ca sĩ thất bại!`)
  }

  res.redirect("back");
}

// [DELETE]
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await Singer.updateOne({
      _id: id
    }, {
      deleted: true
    });

    req.flash("success", `Xóa ca sĩ thành công!`)
  } catch (error) {
    req.flash("error", `xóa ca sĩ thất bại!`)
  }

  res.redirect("back");
}
