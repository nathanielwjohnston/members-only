require("dotenv").config();

const express = require("express");
const app = express();

const path = require("path");

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const router = require("./routes/router");

app.use("/", router);

// TODO: error handling

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Listening on port ${8080}`);
});
