const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 100 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.'
  },
  headers: true, // Send X-RateLimit-* headers
  handler: (req, res, next, options) => {
    const retryAfter = Math.ceil(options.windowMs / 1000);
    res.set('Retry-After', retryAfter);
    res.status(options.statusCode).json({
      status: 'error',
      message: `Too many requests. Try again after ${retryAfter} seconds.`,
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;