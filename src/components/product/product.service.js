const ProductModel = require("./product.model");
const Slugify = require("slugify");
const Factory = require("../Handlers/factory.delete");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");
const ApiFeatures = require("../../utils/ApiFeatures");
// 1- pagination => is done
//2- filter => is done
//3- sort => is done
//4- search => is done
//5- fields =>

// Create Product
exports.addProduct = asyncHandllerError(async (req, res, next) => {
  let imags = [];
  req.body.slug = Slugify(req.body.name);
  req.body.imageCover = req.files?.imageCover[0].filename;
  req.files.images.forEach((elm) => {
    imags.push(elm.filename);
  });
  req.body.images = imags;
  const Product = new ProductModel(req.body);
  await Product.save();
  res.status(201).json({ success: true, data: Product });
});

// get all Products
exports.getAllProducts = asyncHandllerError(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .fields()
    .filter()
    .pagination()
    .search()
    .sort();
  const Products = await apiFeatures.mongooseQuery;
  res.status(200).json({ page: apiFeatures.page, data: Products });
});
//get spicfic Product
exports.getProduct = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const Product = await ProductModel.findById(id);
  !Product && next(new ApiError("not Found Product", 404));
  Product && res.status(200).json({ success: true, data: Product });
});

//delete Product
exports.deleteProduct = Factory.deleteFactory(ProductModel);

//update Product
exports.updateProduct = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  let imags = [];
  if (req.body.name) {
    req.body.slug = Slugify(req.body.name);
  }
  req.body.imageCover = req.files?.imageCover[0].filename;
  req.files.images.forEach((elm) => {
    imags.push(elm.filename);
  });
  req.body.images = imags;
  const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !updateProduct && next(new ApiError("not Found Product", 404));
  updateProduct && res.status(200).json({ success: true, data: updateProduct });
});
