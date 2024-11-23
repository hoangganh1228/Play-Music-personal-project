const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system")

// [GET]
module.exports.login = async (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Đăng nhập"
  });
}

// [POST]
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  const user = await Account.findOne({
    email: email,
    deleted: false
  })

  if(!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  if(user.password != md5(password)) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  if(user.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khóa!");
    res.redirect("back");
    return;
  }

  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

// [GET]
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}
