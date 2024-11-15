const express = require("express");
const database = require("./config/database");

const bodyParser = require("body-parser");
const systemConfig = require("./config/system");
require("dotenv").config();

const app = express();

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

database.connect();

const port = process.env.PORT;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

//App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;


// Routes

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})