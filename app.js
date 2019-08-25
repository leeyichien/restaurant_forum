const express = require("express");
const handlebars = require("express-handlebars");
const db = require("./models");
const bodyParser = require("body-parser"); // add this
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(port, () => {
  db.sequelize.sync();
  console.log(`Example app listening on port ${port}!`);
});

require("./routes")(app);
