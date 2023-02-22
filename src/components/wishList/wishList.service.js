const UserModel = require("../user/user.model");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");

//Add wishList
exports.addWishList = asyncHandllerError(async (req, res, next) => {
  const { wishList } = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: req.body.product },
    },
    { new: true }
  );
  res.status(200).json({ success: true, data: wishList });
});

//remove from wishList
exports.removeWishList = asyncHandllerError(async (req, res, next) => {
  const { wishList } = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishList: req.body.product },
    },
    { new: true }
  );
  !wishList && next(new ApiError("wishList not found", 404));
  wishList && res.status(200).json({ success: true, data: wishList });
});
// get all wishList
exports.getAllWishList = asyncHandllerError(async (req, res, next) => {
  const { wishList } = await UserModel.findById(req.user._id);
  !wishList && next(new ApiError("wishList not found", 404));
  wishList && res.status(200).json({ success: true, data: wishList });
});
