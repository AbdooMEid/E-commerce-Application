const UserModel = require("../user/user.model");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");
const slugify = require("slugify");
//Add address
exports.addAddress = asyncHandllerError(async (req, res, next) => {
  req.body.slug = slugify(req.body.street);
  const { address } = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { address: req.body },
    },
    { new: true }
  );
  res.status(200).json({ success: true, data: address });
});

//remove from address
exports.removeAddress = asyncHandllerError(async (req, res, next) => {
  const { address } = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { address: { _id: req.body.address } },
    },
    { new: true }
  );
  !address && next(new ApiError("address not found", 404));
  address && res.status(200).json({ success: true, data: address });
});
// get all address
exports.getAllAddress = asyncHandllerError(async (req, res, next) => {
  const { address } = await UserModel.findById(req.user._id);
  !address && next(new ApiError("address not found", 404));
  address && res.status(200).json({ success: true, data: address });
});
