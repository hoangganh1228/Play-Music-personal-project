const homeRoute = require("./home.route");
const topicRoute = require("./topic.route")

module.exports = (app) => {
  app.use("/", homeRoute);

  app.use("/topics", topicRoute)

}