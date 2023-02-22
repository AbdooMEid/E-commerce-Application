const CategoryModel = require("./category.model");
const Slugify = require("slugify");
const Factory = require("../Handlers/factory.delete");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");

// Create Category
exports.addCategory = asyncHandllerError(async (req, res, next) => {
  req.body.slug = Slugify(req.body.name);
  req.body.image = req.file?.filename;
  const category = new CategoryModel(req.body);
  await category.save();
  res.status(201).json({ success: true, data: category });
});

// get all categorys
exports.getAllCategorys = asyncHandllerError(async (req, res, next) => {
  const categorys = await CategoryModel.find({});
  res.status(200).json({ success: true, data: categorys });
});
//get spicfic category
exports.getCategory = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError("not Found Category", 404));
  }
  res.status(200).json({ success: true, data: category });
});

//delete category
exports.deleteCategory = Factory.deleteFactory(CategoryModel);

//update Category
exports.updateCategory = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = Slugify(req.body.name);
  }
  req.body.image = req.file?.filename;
  const updateCategory = await CategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateCategory) {
    return next(new ApiError("not Found Category", 404));
  }
  res.status(200).json({ success: true, data: updateCategory });
});
