const express = require("express");
const handlebars = require("express-handlebars");
const db = require("./models");
const bodyParser = require("body-parser"); // add this
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");
  next();
});

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(port, () => {
  db.sequelize.sync();
  console.log(`Example app listening on port ${port}!`);
});

require("./routes")(app);
