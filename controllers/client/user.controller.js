const md5 = require("md5");
const User = require("../../models/user.model");

module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
}

module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email
  })

  if(existEmail) {
    req.flash("error", "Email đã tồn tại!");
    res.redirect("back");
    return;
  }
  if(req.body.password != req.body.password_confirm) {
    req.flash("error", "Mật khẩu không khớp");
    res.redirect("back");
    return;
  }

  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save(); 
  
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
}