const express = require("express");
const handlebars = require("express-handlebars");
const db = require("./models");
const bodyParser = require("body-parser"); // add this
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("./config/passport");
const methodOverride = require("method-override");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use("/upload", express.static(__dirname + "/upload"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");
  res.locals.user = req.user;
  next();
});

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(methodOverride("_method"));

//listen to port 3000
app.listen(port, () => {
  db.sequelize.sync();
  console.log(`Example app listening on port ${port}!`);
});

require("./routes")(app, passport);
