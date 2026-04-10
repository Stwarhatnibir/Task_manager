function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[${new Date().toISOString()}] ${status} - ${message}`);

  res.status(status).json({
    success: false,
    error: message,
  });
}

function createError(message, status = 400) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = { errorHandler, createError };
