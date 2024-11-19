const systemConfig = require("../../config/system");
const dashboardRoute = require("./dashboard.route");
const topicsRoute = require("../../routes/admin/topic.route");
const songRoute = require("../../routes/admin/song.route");
const singerRoute = require("../../routes/admin/singer.route");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", dashboardRoute);

  app.use(PATH_ADMIN + "/topics", topicsRoute);

  app.use(PATH_ADMIN + "/songs", songRoute);

  app.use(PATH_ADMIN + "/singers", singerRoute);

}