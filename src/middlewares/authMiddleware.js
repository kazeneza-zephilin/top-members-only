function ensureLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login"); // if not logged in, redirect to login
}

module.exports = { ensureLoggedIn };
