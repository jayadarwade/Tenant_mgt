const express = require("express");
const router = express.Router();
const passport = require("passport");
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/", forwardAuthenticated, (req, res) => res.render("login"));

// Login
router.post("/login", passport.authenticate("local", {
  failureFlash: true,
  failureRedirect: "/login"
}), async function (req, res) {
  let userData = localStorage.getItem('User');
  return res.redirect("/dashboard")
});

router.post("/logout", (req, res) => {
  req.logout(f => { localStorage.removeItem("User"); });
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});

module.exports = router;
