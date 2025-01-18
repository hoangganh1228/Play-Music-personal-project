const systemConfig = require("../../config/system");
const dashboardRoute = require("./dashboard.route");
const topicsRoute = require("../../routes/admin/topic.route");
const songRoute = require("../../routes/admin/song.route");
const singerRoute = require("../../routes/admin/singer.route");
const accountRoute = require("../../routes/admin/account.route");
const roleRoute = require("../../routes/admin/role.route");
const authRoute = require("../../routes/admin/auth.route");
const carouselRoute = require("../../routes/admin/carousel.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(
    PATH_ADMIN + "/dashboard", 
    authMiddleware.requireAuth,
    dashboardRoute
  );

  app.use(
    PATH_ADMIN + "/topics",
    authMiddleware.requireAuth, 
    topicsRoute
  );

  app.use(
    PATH_ADMIN + "/songs",
    authMiddleware.requireAuth, 
    songRoute
  );

  app.use(
    PATH_ADMIN + "/singers",
    authMiddleware.requireAuth, 
    singerRoute
  );

  app.use(
    PATH_ADMIN + "/roles",
    authMiddleware.requireAuth, 
    roleRoute
  );
  
  app.use(
    PATH_ADMIN + "/accounts",
    authMiddleware.requireAuth, 
    accountRoute
  );

  app.use(
    PATH_ADMIN + "/carousel",
    authMiddleware.requireAuth, 
    carouselRoute
  );

  app.use(
    PATH_ADMIN + "/auth",
    authRoute
  );

}