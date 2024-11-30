const homeRoute = require("./home.route");
const topicRoute = require("./topic.route");
const songRoute = require("./song.route");
const favoriteSongRoute = require("./favorite.route");
const searchRoutes = require("./search.route");

module.exports = (app) => {
  app.use("/", homeRoute);

  app.use("/topics", topicRoute);

  app.use("/songs", songRoute);

  app.use("/favorite-songs", favoriteSongRoute);

  app.use("/search", searchRoutes)

}