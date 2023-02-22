const UserModel = require("./user.model");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hash } = require("../../utils/hashPassword");
// const { main } = require("../../utils/nodemailer");

// SignUpe User
exports.signUp = asyncHandllerError(async (req, res, next) => {
  // const FullUrl =
  //   req.protocol + "://" + req.headers.host + "/api/v1/users" + "/check/:id";
  const isUser = await UserModel.findOne({ email: req.body.email });
  if (isUser) return next(new ApiError("email is already exsist", 401));
  req.body.password = await hash(req.body.password);
  // await main(req.body.email, req.body.name, FullUrl);
  const User = new UserModel(req.body);
  await User.save();
  res.status(201).json({ success: true, data: User });
});

// verfiy Account
// exports.verfiedAccount = asyncHandllerError(async (req, res, next) => {
//   const { id } = req.params;
//   if (!id) {
//     return next(new ApiError("id not found", 401));
//   }
//   const verfied = await UserModel.findByIdAndUpdate(
//     id,
//     {
//       verfied: true,
//     },
//     { new: true }
//   );
//   res.status(200).json({ success: true, data: "updated" });
// });
//SignIn User
exports.signIn = asyncHandllerError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return next(new ApiError("incorrect email or Password", 401));
  // if (user.verfied === false)
  //   return next(new ApiError("please check your email verfaied", 401));
  const token = jwt.sign(
    { name: user.name, id: user._id, email: user.email },
    process.env.JWT_KEY
  );
  res.status(200).json({ success: true, token });
});

//change password User
exports.updatePasswordUser = asyncHandllerError(async (req, res, next) => {
  let id = req.user.id;
  req.body.passwordCahngeAt = Date.now();
  const { oldPassword, newPassword, confirmPassword } = req.body;
  let user = await UserModel.findById(id);
  if (!user) return next(new ApiError("user Not found", 404));
  const matches = await bcrypt.compare(oldPassword, user.password);
  if (!matches) return next(new ApiError("incorrect password", 401));
  if (newPassword !== confirmPassword)
    return next(
      new ApiError("new Password and confirm Password not matches", 401)
    );
  req.body.password = await hash(newPassword);
  const updatePassword = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  updatePassword &&
    res.status(200).json({ success: true, data: updatePassword });
});

//change Image user
exports.ProfileImage = asyncHandllerError(async (req, res, next) => {
  const id = req.user.id;
  console.log(id);
  console.log(req.file);
  req.body.profileImage = req.file?.filename;
  const updateImage = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateImage) {
    return next(new ApiError("not Found user", 404));
  }
  res.status(200).json({ success: true, data: updateImage });
});
