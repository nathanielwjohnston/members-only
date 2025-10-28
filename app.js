require("dotenv").config();

const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");
const pool = require("./config/pool");
const pgStore = require("connect-pg-simple")(session);
require("./config/passport");

const path = require("path");

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Session setup
const sessionStore = new pgStore({ pool, createTableIfMissing: true });

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Locals default middleware
app.use((req, res, next) => {
  res.locals.values = {};
  res.locals.errors = [];
  next();
});

const router = require("./routes/router");

app.use("/", router);

// TODO: error handling

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Listening on port ${8080}`);
});
