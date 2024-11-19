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