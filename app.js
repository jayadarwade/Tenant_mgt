const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const bodyparser = require("body-parser");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// .env Config
require("dotenv").config();

// Passport Config
require("./config/passport")(passport);

// .env Config
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB", err));

// EJS
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

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
// app.use("/login", require("./routes/login.js"));
app.use("/tenant", require("./routes/tenant.js"));
app.use("/user", require("./routes/login.js"));

// Api 
app.use("/api/user", require("./routes/apis/user.router.js"));
app.use("/api/tenant", require("./routes/apis/tenant.router.js"));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

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
