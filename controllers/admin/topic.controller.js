const Topic = require("../../models/topic.model");


module.exports.index = async (req, res) => {
  
  res.render("admin/pages/topics/index", {
    pageTitle: "Trang chu de"
  })
}