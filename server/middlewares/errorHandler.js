const { ZodError } = require("zod");
const CustomError = require('../utils/customError');

const formatZodError = (err) => ({
  success: false,
  message: "Validation failed",
  errors: err.errors.map(error => ({
    field: error.path.join('.'),
    message: error.message
  }))
});

const formatError = (err) => {
  if (err instanceof ZodError) {
    return formatZodError(err);
  }
  
  if (err instanceof CustomError) {
    return {
      success: false,
      message: err.message,
      errors: err.errors,
      statusCode: err.statusCode
    };
  }
  
  return {
    success: false,
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500
  };
};

const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);

  const formattedError = formatError(err);
  const statusCode = formattedError.statusCode || 500;

  res.status(statusCode).json({
    ...formattedError,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};

const handleErrors = (res, err) => {
  const formattedError = formatError(err);
  const statusCode = formattedError.statusCode || 500;

  res.status(statusCode).json(formattedError);
};

module.exports = {
  errorHandler,
  handleErrors
};