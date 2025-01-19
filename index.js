const express = require("express");
const database = require("./config/database");
const path = require('path');
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash');
const moment = require('moment');
const systemConfig = require("./config/system");
require("dotenv").config();

const app = express();

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

database.connect();

const port = process.env.PORT;

app.use(express.static(`${__dirname}/public`));

app.use(methodOverride('_method'))
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", `${__dirname}//views`);
app.set("view engine", "pug");


app.use(cookieParser('JHFJSBFJKSE'));

app.use(session({ cookie: { maxAge: 60000 }}));

app.use(flash());

// End Flash

app.locals.moment = moment;

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End TinyMCE

//App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})