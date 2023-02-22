const SubCategoryModel = require("./subCategory.model");
const Slugify = require("slugify");
const Factory = require("../Handlers/factory.delete");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");

// Create SubCategory
exports.addSubCategory = asyncHandllerError(async (req, res, next) => {
  const { name, category } = req.body;
  const SubCategory = new SubCategoryModel({
    name,
    slug: Slugify(name),
    category,
  });
  await SubCategory.save();
  res.status(201).json({ success: true, data: SubCategory });
});

// get all Subcategorys
exports.getAllSubCategorys = asyncHandllerError(async (req, res, next) => {
  let fillter = {};
  if (req.params.categoryId) {
    fillter = {
      category: req.params.categoryId,
    };
  }
  const SubCategory = await SubCategoryModel.find(fillter);
  res.status(200).json({ success: true, data: SubCategory });
});
//get spicfic Subcategory
exports.getSubCategory = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const SubCategory = await SubCategoryModel.findById(id);
  if (!SubCategory) {
    return next(new ApiError("not Found SubCategory", 404));
  }
  res.status(200).json({ success: true, data: SubCategory });
});

//delete Subcategory
exports.deleteSubCategory = Factory.deleteFactory(SubCategoryModel);

//update SubCategory
exports.updateSubCategory = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(
    id,
    {
      name,
      slug: Slugify(name),
      category,
    },
    { new: true }
  );
  if (!updateSubCategory) {
    return next(new ApiError("not Found SubCategory", 404));
  }
  res.status(200).json({ success: true, data: updateSubCategory });
});
