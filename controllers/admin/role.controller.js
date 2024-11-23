const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

// [GET]
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }

  const roles = await Role.find(find);

  res.render("admin/pages/roles/index", {
    pageTitle: "Trang nhóm  quyền",
    roles: roles
  })

}

// [GET]
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Trang tạo mới nhóm quyền",
  })
}

// [POST] 
module.exports.createPost = async (req, res) => {
  try {
    const objectRole = new Role({
      title: req.body.title,
      description: req.body.description
    })
    objectRole.save();
    req.flash("success", `Thêm quyền thành công!`);
  } catch (error) {
    req.flash("error", `Thêm quyền thất bại!`);
  }

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [GET]
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const role = await Role.findOne({
    _id: id
  });

  res.render("admin/pages/roles/edit", {
    pageTitle: "Trang chỉnh sửa nhóm quyền",
    role: role
  })
}

// [PATCH]
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  try {
    const objectRole = {
      title: req.body.title,
      description: req.body.description
    }
  
    await Role.updateOne({
      _id: id
    }, objectRole);
    req.flash("success", `Sửa quyền thành công!`);
  } catch (error) {
    req.flash("error", `Sửa quyền thất bại!`);
  }
  
  res.redirect(`${systemConfig.prefixAdmin}/roles`);

}

// [DELETE]
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Role.updateOne({
      _id: id
    }, {
      deleted: true
    })
    
    req.flash("success", `Xóa thành công!`);
  } catch (error) {
    req.flash("error", `Xóa thất bại!`);
  }

  res.redirect(`${systemConfig.prefixAdmin}/roles`);

}

// [GET]
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false
  }

  const roles = await Role.find(find);
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phân quyền",
    roles: roles
  });
}

// [PATCH]
module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);

    for(const item of permissions) {
      await Role.updateOne({
        _id: item.id
      }, {
        permissions: item.permissions
      })

      req.flash("success", "Cập nhật phân quyền thành công!");

      res.redirect("back");
    }
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }
}