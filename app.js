const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const error = require("./router/error");
const compress = require("./router/compress");
const success = require("./router/success");
const upload = require("./router/upload");
const unlink = require("./router/unlink");

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/upload", upload);
app.use("/error", error);
app.use("/compress", compress);
app.use("/success", success);
app.use("/unlink", unlink);
app.listen(process.env.PORT || 80, () => {
  console.log("Running");
});
