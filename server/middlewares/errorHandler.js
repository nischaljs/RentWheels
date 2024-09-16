const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    // Log the error 
    console.error(`[${new Date().toISOString()}] Error: ${message}`, err);
  
    // Custom error response
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        statusCode,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
      },
    });
  };
  
  module.exports = errorHandler;
  