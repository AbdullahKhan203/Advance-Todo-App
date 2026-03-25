// middlewares/errorHandler.js

// Error-handling middleware
export const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack); // log full stack in console for debugging

  // Set default status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    // Optional: include stack trace in development mode
    // stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};




