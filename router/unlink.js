const route = require("express").Router();
const fs = require("fs");
const path = require("path");
route.delete("/", (req, res) => {
  try {
    let dir = __dirname.split("/");
    dir.pop();
    dir = dir.join("/") + "/";

    setTimeout(() => {
      fs.readdir(path.join(dir, `public/temp/`), (error, files) => {
        if (error) {
          return res.status(400).json({
            status: "Error",
            error: error,
          });
        } else {
          for (const file of files) {
            fs.unlink(
              path.join(path.join(dir, `public/temp/`), file),
              (error) => {
                if (error)
                  return res.status(400).json({
                    status: "Error",
                    error: error,
                  });
              }
            );
          }
        }
      });
    }, 200);
    res.status(200).json({
      status: "Success",
      message: "Deleted All files SuccessFully!!",
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
});
module.exports = route;
