const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //Log console for dev info
  console.log(err.stack);

  //Mongoose bad objectId

  if (err.name === "CastError") {
    const message = `Bootcamp with ${err.value} id not found`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server"s error',
  });
};

module.exports = errorHandler;
