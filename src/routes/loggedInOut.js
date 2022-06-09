function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
}

// super jednoduche auth route guards ;)

module.exports = {
    isLoggedIn,
    isLoggedOut
}