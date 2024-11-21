const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

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