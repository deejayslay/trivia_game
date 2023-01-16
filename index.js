const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public"))); // for static assets and to run index.js anywhere

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(5500, () => {
  console.log("listening on port 5500");
});
