

const handleErrors = (err, req, res, next) => {
    let statusCode = 500; // Default to server error
    let errorMessage = 'Internal Server Error';
  
    // Zod validation errors
    if (err.name === 'ZodError') {
      statusCode = 400; // Bad request
      errorMessage = err.errors.map(error => error.message).join(', '); // Collect all error messages
    }
  
    // Prisma client errors
    if (err.code && err.code.startsWith('P')) {
      statusCode = 400;
      switch (err.code) {
        case 'P2002': // Unique constraint failed
          errorMessage = `Duplicate entry for field: ${err.meta.target}`;
          break;
        case 'P2025': // Record not found
          errorMessage = `Record not found: ${err.meta.cause}`;
          break;
        default:
          errorMessage = 'Database error occurred';
          break;
      }
    }
  
    // Handle authentication errors
    if (err.name === 'UnauthorizedError') {
      statusCode = 401; // Unauthorized
      errorMessage = 'Invalid token or not authorized';
    }
  
    // Custom application errors
    if (err.statusCode && err.message) {
      statusCode = err.statusCode;
      errorMessage = err.message;
    }
  
    // Log the error details (optional, for debugging)
    console.error('Error details:', err);
  
    // Send the error response
    return res.status(statusCode).json({
      success: false,
      error: errorMessage,
    });
  };
  
  module.exports = handleErrors;
  