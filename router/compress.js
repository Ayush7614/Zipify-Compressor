const route = require("express").Router();
const fs = require("fs");
const path = require("path");
var zlib = require("zlib");
const JSZip = require("jszip");

route.post("/zipper", async (req, res) => {
  try {
    let dir = __dirname.split("/");
    dir.pop();
    dir = dir.join("/") + "/";
    var zip = new JSZip();
    req.body.file.forEach((file) => {
      file.split(".")[1] === "txt"
        ? zip.file(file, fs.readFileSync(path.join(dir, `public/temp/${file}`)))
        : zip.file(
            file,
            fs.readFileSync(path.join(dir, `public/temp/${file}`)),
            {
              base64: true,
            }
          );
    });
    await zip.generateAsync({ type: "nodebuffer" }).then(function (content) {
      fs.writeFile(dir + "public/temp/Compress.zip", content, (error) => {
        if (error) {
          return res.status(400).json({
            status: "Error",
            error: error,
          });
        } else {
          return res.status(200).json({
            status: "Success",
            file: "Compress.zip",
          });
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
});

route.post("/File", async (req, res) => {
  try {
    let dir = __dirname.split("/");
    dir.pop();
    dir = dir.join("/") + "/";
    let fileBuffer;
    const file = req.body.file[0];
    const destination = `public/temp/${file.split(".").join("")}.gz`;
    fileBuffer = fs.readFileSync(path.join(dir, `public/temp/${file}`)).buffer;
    await zlib.gzip(fileBuffer, (err, response) => {
      if (err) {
        return res.status(400).json({
          status: "Error",
          error: error,
        });
      }
      fs.writeFile(path.join(dir, destination), response, (err, data) => {
        if (err) {
          return res.status(400).json({
            status: "Error",
            error: error,
          });
        }
        return res.status(200).json({
          status: "Success",
          file: `${file.split(".").join("")}.gz`,
        });
      });
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      error: error,
    });
  }
});

module.exports = route;
