const md5 = require("md5");
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

// [GET]
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  const accounts = await Account.find(find).select("-password -token");

  for (const account of accounts) {
    const role = await Role.findOne({
      _id: account.role_id,
      deleted: false
    })
    account.role = role
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Trang danh sách tài khoản",
    accounts: accounts
  })
}

// [GET]
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false
  });

  res.render("admin/pages/accounts/create", {
    pageTitle: "Trang danh sách tài khoản",
    roles: roles
  })
}

// [POST]
module.exports.createPost = async (req, res) => {
  try {
    const objectAccount = new Account({
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      phone: req.body.phone,
      role_id: req.body.role_id,
      status: req.body.status,
      avatar: req.body.avatar
    })
  
    objectAccount.save();
    req.flash('success', `Thêm tài khoản thành công!`);
    
  } catch (error) {
    req.flash('error', `Thêm tài khoản thất bại!`)
  }  

  res.redirect(`${systemConfig.prefixAdmin}/accounts`)
}

// [GET]
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const account = await Account.findOne({
    _id: id
  })

  const roles = await Role.find({
    deleted: false
  })

  

  res.render("admin/pages/accounts/edit", {
    pageTitle: "Trang danh sách tài khoản",
    account: account,
    roles: roles
  })
}

// [PATCH]
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  
  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false
  })
  

  if(emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } else {
    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Account.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật tài khoản thành công!");
  }
  res.redirect("back");
}

// [DELETE]
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
  
    await Account.updateOne({
      _id: id
    }, {
      deleted: true
    }); 
    req.flash("success", `Xóa tài khoản thành công!`)

  } catch (error) {
    req.flash("error", `Xóa tài khoản thất bại!`)
  }
  

  res.redirect("back");

  
}