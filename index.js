const express = require("express");
const port = 8000;
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./static"));
// app.use(express.static(path.join(__dirname, "static")));

app.use(expressLayouts);

//extract style and script from sub pages into the layout

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// use express router
app.use("/", require("./routes/index"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in server ${err}`);
    return;
  }
  console.log("server started");
});
