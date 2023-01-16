const express = require("express");
const app = express();
const path = require("path");
// const request = require("request");
// const api_helper = require("./API_helper");

app.use(express.static(path.join(__dirname, "/public"))); // for static assets and to run index.js anywhere

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/readyForm", (req, res) => {
  res.render("readyForm");
});

app.get("/trivia", (req, res) => {
  let categorySelection = req.query.category;
  let diffSelection = req.query.difficulty;
  let formatSelection = req.query.format;
  //   api_helper
  //     .make_API_CALL(
  //       `https://opentdb.com/api.php?amount=10&category=${categorySelection}&difficulty=${diffSelection}&type=${formatSelection}&`
  //     )
  //     .then((response) => {
  //       res.json(response);
  //     })
  //     .catch((error) => {
  //       res.send(error);
  //     });
});

app.listen(5500, () => {
  console.log("listening on port 5500");
});
