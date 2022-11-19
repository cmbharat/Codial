const express = require("express");
const port = 8000;

const app = express();

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
