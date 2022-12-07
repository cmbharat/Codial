const express = require("express");
const port = 8000;
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./static"));
// app.use(express.static(path.join(__dirname, "static")));

app.use(expressLayouts);

//extract style and script from sub pages into the layout

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store session cookie in db
app.use(
  session({
    name: "codeial",
    //change sercret bfor deploment in prod mode
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore({
      mongooseConnection: db,
      autoRemove: "disabled",
    }),
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in server ${err}`);
    return;
  }
  console.log("server started");
});
