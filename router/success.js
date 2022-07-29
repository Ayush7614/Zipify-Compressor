const route = require("express").Router();
const fs = require("fs");
const path = require("path");
route.get("/:filename", (req, res) => {
  try {
    let dir = __dirname.split("/");
    dir.pop();
    dir = dir.join("/") + "/";
    return res
      .status(200)
      .sendFile(path.join(dir, `public/temp/${req.params.filename}`));
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
});
module.exports = route;
