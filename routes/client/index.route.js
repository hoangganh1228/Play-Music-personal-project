const homeRoute = require("./home.route");
const topicRoute = require("./topic.route");
const songRoute = require("./song.route");

module.exports = (app) => {
  app.use("/", homeRoute);

  app.use("/topics", topicRoute);

  app.use("/songs", songRoute);

}