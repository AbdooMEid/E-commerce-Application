module.exports.globalErrorMiddlware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
    devMode(err, res);
  } else {
    prodMode(err, res);
  }
};

const devMode = (err, res) => {
  res
    .status(err.statusCode)
    .json({ status: err.statusCode, msg: err.message, stack: err.stack });
};

const prodMode = (err, res) => {
  res.status(err.statusCode).json({ status: err.statusCode, msg: err.message });
};
