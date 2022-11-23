const express = require("express");
const port = 8000;

const app = express();
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);

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
