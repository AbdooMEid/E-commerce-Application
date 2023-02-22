const BrandModel = require("./brand.model");
const Slugify = require("slugify");
const Factory = require("../Handlers/factory.delete");
const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");
// const cloudinary = require()

// cloudinary.config({
//   cloud_name: 'dcglwnltn',
//   api_key: '436261494199592',
//   api_secret: 'gJZ04nK78-MAC51EuR8Jfa3K0xo'
// });
// Create Brand
exports.addBrand = asyncHandllerError(async (req, res, next) => {
  req.body.slug = Slugify(req.body.name);
  req.body.image = req.file?.filename;
  const Brand = new BrandModel(req.body);
  await Brand.save();
  res.status(201).json({ success: true, data: Brand });
});

// get all Brands
exports.getAllBrands = asyncHandllerError(async (req, res, next) => {
  const Brands = await BrandModel.find({});
  res.status(200).json({ success: true, data: Brands });
});
//get spicfic Brand
exports.getBrand = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  const Brand = await BrandModel.findById(id);
  !Brand && next(new ApiError("not Found Brand", 404));
  Brand && res.status(200).json({ success: true, data: Brand });
});

//delete Brand
exports.deleteBrand = Factory.deleteFactory(BrandModel);

//update Brand
exports.updateBrand = asyncHandllerError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = Slugify(req.body.name);
  }
  req.body.image = req.file?.filename;
  const updateBrand = await BrandModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !updateBrand && next(new ApiError("not Found Brand", 404));
  updateBrand && res.status(200).json({ success: true, data: updateBrand });
});
