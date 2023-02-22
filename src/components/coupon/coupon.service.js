const CouponModel = require("./coupon.model");
const Factory = require("../Handlers/factory.delete");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");

// Create Coupon
exports.addCoupon = asyncHandllerError(async (req, res, next) => {
  const Coupon = new CouponModel(req.body);
  await Coupon.save();
  res.status(201).json({ success: true, data: Coupon });
});

// get all Coupons
exports.getAllCoupons = asyncHandllerError(async (req, res, next) => {
  const Coupons = await CouponModel.find({});
  res.status(200).json({ success: true, data: Coupons });
});
//get spicfic Coupon
exports.getCoupon = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const Coupon = await CouponModel.findById(id);
  if (!Coupon) {
    return next(new ApiError("not Found Coupon", 404));
  }
  res.status(200).json({ success: true, data: Coupon });
});

//delete Coupon
exports.deleteCoupon = Factory.deleteFactory(CouponModel);

//update Coupon
exports.updateCoupon = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const updateCoupon = await CouponModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateCoupon) {
    return next(new ApiError("not Found Coupon", 404));
  }
  res.status(200).json({ success: true, data: updateCoupon });
});
