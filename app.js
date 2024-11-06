const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const bodyparser = require("body-parser");
const path = require('path');
const app = express();
const cors = require("cors");
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Authorization", "token");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// .env Config
require("dotenv").config();

// Passport Config
require("./config/passport")(passport);

// Connect to MongoDB
const mongoose = require('mongoose');

mongoose
  .connect(process.env.mongoURI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// EJS
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.error2 = req.flash("error2");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/tenant", require("./routes/tenant.js"));
app.use("/user", require("./routes/login.js"));

// Api 
app.use("/api/user", require("./routes/apis/user.router.js"));
app.use("/api/tenant", require("./routes/apis/tenant.router.js"));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
