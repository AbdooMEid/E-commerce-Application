const jwt = require("jsonwebtoken");
const userModel = require("../src/components/user/user.model");
const ApiError = require("../src/utils/Error/ApiError");
const { asyncHandllerError } = require("../src/utils/Error/asyncHandlingError");

exports.auth = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) return next(new ApiError("token not provided", 401));
  const decoded = await jwt.verify(token, process.env.JWT_KEY);
  const user = await userModel.findById(decoded.id);
  if (!user) return next(new ApiError("user not found", 404));
  let changePasswordDate = parseInt(user.passwordCahngeAt.getTime() / 1000);
  if (!user.passwordCahngeAt) return next(new ApiError("notFound method", 404));
  if (changePasswordDate > decoded.iat)
    return next(new ApiError("changed Password", 401));
  req.user = user;
  next();
};

exports.allwoedTo = (...roles) => {
  return asyncHandllerError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new ApiError("you are not authroized to access this route ", 401)
      );
    next();
  });
};
