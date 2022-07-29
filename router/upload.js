const route = require("express").Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
let dir = __dirname.split("/");
dir.pop();
dir = dir.join("/") + "/";
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(dir, `public/temp`));
  },
  filename: (req, file, cb) => {
    cb(null, req.body.FileName);
  },
});
const Upload = multer({ storage: Storage });

route.post("/", Upload.single("file"), (req, res) => {
  try {
    let dir = __dirname.split("/");
    dir.pop();
    dir = dir.join("/") + "/";
    fs.readdir(path.join(dir, `public/temp/`), (err, files) => {
      if (err) {
        return res.status(500).json({
          status: "Error",
          error: error,
        });
      } else {
        res.status(200).json({ status: "Success", files: files });
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
});
module.exports = route;
