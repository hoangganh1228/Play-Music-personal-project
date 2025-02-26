const homeRoute = require("./home.route");
const topicRoute = require("./topic.route");
const songRoute = require("./song.route");
const favoriteSongRoute = require("./favorite.route");
const searchRoutes = require("./search.route");
const userRoute = require("./user.route");
const playlistRoute = require("./playlist.route");
const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) => {
  app.use(userMiddleware.infoUser);

  app.use("/", homeRoute);

  app.use("/topics", topicRoute);

  app.use("/songs", songRoute);

  app.use("/favorite-songs", favoriteSongRoute);

  app.use("/search", searchRoutes);

  app.use("/user", userRoute);

  app.use("/playlists", playlistRoute);

}