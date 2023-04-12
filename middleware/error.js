const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  if (err.errors) {
    error.message = err.errors[Object.keys(error.errors)[0]].properties.message;
  } else {
    error.message = err.message
  }

  if (err.name === 'CastError') {
    const message = `Entry not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // duplicate key err
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // validation err
  if (err.code === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.log(err.stack.red);
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;