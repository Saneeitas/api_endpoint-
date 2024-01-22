const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  // Handle specific errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    errorMessage = "Validation error";
  }

  // Handle other types of errors
  res.status(statusCode).json({ error: errorMessage });
};

module.exports = errorHandler;
