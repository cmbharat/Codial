//require the library
const mongoose = require("mongoose");

//connect to the database
mongoose.connect("mongodb://localhost/codeial_development");

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on("error", function (err) {
  console.error.bind(console, err.message);
});

//up and running then print the message
db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;
