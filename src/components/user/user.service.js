const UserModel = require("./user.model");
const Factory = require("../Handlers/factory.delete");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");
const bcrypt = require("bcrypt");
const { hash } = require("../../utils/hashPassword");
// Create User
exports.addUser = asyncHandllerError(async (req, res, next) => {
  const isUser = await UserModel.findOne({ email: req.body.email });
  if (isUser) return next(new ApiError("email is already exsist", 401));
  req.body.password = await hash(req.body.password);
  const User = new UserModel(req.body);
  await User.save();
  res.status(201).json({ success: true, data: User });
});

// get all Users
exports.getAllUsers = asyncHandllerError(async (req, res, next) => {
  const Users = await UserModel.find({});
  res.status(200).json({ success: true, data: Users });
});
//get spicfic User
exports.getUser = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const User = await UserModel.findById(id);
  !User && next(new ApiError("not Found User", 404));
  User && res.status(200).json({ success: true, data: User });
});

//delete User
exports.deleteUser = Factory.deleteFactory(UserModel);

//update User
exports.updateUser = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !updateUser && next(new ApiError("not Found User", 404));
  updateUser && res.status(200).json({ success: true, data: updateUser });
});

// change Password
exports.updatePassword = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  req.body.passwordCahngeAt = Date.now();
  let user = await UserModel.findById(id);
  if (!user) return next(new ApiError("user Not found", 404));
  req.body.password = await hash(req.body.password);
  const updatePassword = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  updatePassword &&
    res.status(200).json({ success: true, data: updatePassword });
});
