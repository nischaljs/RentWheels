// handleErrors.js
const handleErrors = (err, req, res, next) => {
  // Ensure res is defined
  if (!res) {
    console.error('Response object is undefined:', err);
    return;
  }

  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.response) {
    // Handle Axios error responses
    statusCode = err.response.status;
    message = err.response.data.detail || err.response.data.message;
  } else if (err.status) {
    // Handle other HTTP errors
    statusCode = err.status;
    message = err.message;
  }

  console.error('Error:', {
    statusCode,
    message,
    // stack: err.stack
  });

  return res.status(statusCode).json({
    success: false,
    message,
    // ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = handleErrors;