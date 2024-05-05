
// Middleware function for CSRF token injection
const addCsrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // or use req.csrfToken() directly
  next();
};

module.exports = {
  addCsrfToken,
};
