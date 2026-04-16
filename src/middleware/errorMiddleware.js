// Centralized Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  // Set default status code to 500 (Internal Server Error) if not set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Include stack trace only in development environment
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
