module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    return res.redirect("/");
  },
  forwardAuthenticated: async function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/dashboard");
  },
};
