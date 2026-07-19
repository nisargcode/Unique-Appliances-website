import fs from "fs";

const errorHandler = (err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, () => {});
  }
  if (req.files) {
    req.files.forEach((file) => {
      fs.unlink(file.path, () => {});
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export { errorHandler };
