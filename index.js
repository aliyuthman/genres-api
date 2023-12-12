const mongoose = require("mongoose");
const express = require("express");
const app = express();

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const genres = require("./routes/genres");

const config = require("config");

const log = require("./logger");
const auth = require("./auth");

const helmet = require("helmet");
const morgan = require("morgan");

// buit-in middleware
app.use(express.json()); //parsing json
app.use(express.urlencoded({ extended: true })); //parsing url key-value params
app.use(express.static("public")); //parsing static files to serve static files from the root of the app

// third-party middleware
app.use(helmet());

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/genres-app");
};

//router
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;

// Environment variable

// console.log("NODE_ENV: " + process.env.NODE_ENV); //undefined - by default when not set it is undefined which make app.get('env') to return developement

// console.log("app: " + app.get("env"));

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny")); //log request to the console or configure log to a log file
  // console.log('Morgan enabled...')
  startupDebugger("Morgan enabled");
}

if (app.get("env") === "production") {
  app.use(morgan("tiny")); //log request to the console or configure log to a log file
  // console.log('Morgan enabled...')
  startupDebugger("Morgan disabled");
}

// custom middleware
app.use(log);
app.use(auth);

app.listen(port, () => {
  console.log("Server running on " + port);
});

connect()
  .then(() => {
    // DB Work
    dbDebugger("Connected to the database....");
  })
  .catch((error) => dbDebugger("Could not connect to MongoDB"));
