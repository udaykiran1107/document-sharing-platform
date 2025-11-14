/**
 * Global error handler middleware
 * Catches all errors and returns appropriate responses
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized access'
    });
  }

  // Generic error response
  res.status(statusCode).json({
    success: false,
    error: message
  });
};

/**
 * 404 Not Found handler
 * Catches requests to undefined routes
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
};

/**
 * Request validation middleware
 * Validates common request parameters
 */
export const validateRequest = (req, res, next) => {
  // Add any common validation logic here
  next();
};
