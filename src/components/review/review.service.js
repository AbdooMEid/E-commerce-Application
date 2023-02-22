const ReviewModel = require("./review.model");
const Factory = require("../Handlers/factory.delete");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");

// Create Review
exports.addReview = asyncHandllerError(async (req, res, next) => {
  const isReview = await ReviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isReview)
    return next(new ApiError("you are created a review befor", 402));
  req.body.user = req.user._id;
  const Review = new ReviewModel(req.body);
  await Review.save();
  res.status(201).json({ success: true, data: Review });
});

// get all Reviews
exports.getAllReviews = asyncHandllerError(async (req, res, next) => {
  const Reviews = await ReviewModel.find({})
  res.status(200).json({ success: true, data: Reviews });
});
//get spicfic Review
exports.getReview = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const Review = await ReviewModel.findById(id);
  !Review && next(new ApiError("not Found Review", 404));
  Review && res.status(200).json({ success: true, data: Review });
});

//delete Review
exports.deleteReview = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.user.role);
  const isReview = await ReviewModel.findById(id);
  if (
    isReview.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  )
    return next(new ApiError("not deleted", 401));
  const deleteReview = await ReviewModel.findByIdAndDelete(id, {
    new: true,
  });
  !deleteReview && next(new ApiError("not Found Review", 404));
  deleteReview && res.status(200).json({ success: true, data: deleteReview });
});

//update Review
exports.updateReview = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const isReview = await ReviewModel.findById(id);
  if (isReview.user._id.toString() !== req.user._id.toString())
    return next(new ApiError("not updated", 401));
  req.body.user = req.user._id;
  const updateReview = await ReviewModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !updateReview && next(new ApiError("not Found Review", 404));
  updateReview && res.status(200).json({ success: true, data: updateReview });
});
