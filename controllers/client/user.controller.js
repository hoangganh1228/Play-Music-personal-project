const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const Playlist = require("../../models/playlist.model");

const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");

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

// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản",
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if(!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  if(md5(password) !=  user.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  if(user.status === "inactive") {
    req.flash("error", "Tài khoản đang bị khóa!");
    res.redirect("back");
    return;
  }

  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
}

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Lấy lại mật khẩu",
  });
}

module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
}

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if(!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  const otp = generateHelper.generateRandomNumber(6);

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now()
  };


  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
    Mã OTP để lấy lại mật khẩu là <b style="color: green;">${otp}</b>. Thời hạn sử dụng là 3 phút.
  `;
  
  sendMailHelper.sendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
}

module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/  ", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
}

module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp
  })

  if(!result) {
    req.flash("error", "OTP không hợp lệ!");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email
  });

  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
}

module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đổi mật khẩu",
  });
};

module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;
  await User.findOne({
    tokenUser: tokenUser
  }, {
    password: md5(password)
  })
  res.redirect("/");
};

