const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Log the error stack in development
  // if (process.env.NODE_ENV === 'development') {
  //     console.error(err.stack);
  // }
  console.error(err.stack);
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
};

module.exports = errorHandler;
