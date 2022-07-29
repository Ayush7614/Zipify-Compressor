const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("error");
});

module.exports = route;
