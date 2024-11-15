const systemConfig = require("../../config/system");
const dashboardRoute = require("./dashboard.route");
const topicsRoute = require("../../routes/admin/topic.route")

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", dashboardRoute);

  app.use(PATH_ADMIN + "/topics", topicsRoute);
}