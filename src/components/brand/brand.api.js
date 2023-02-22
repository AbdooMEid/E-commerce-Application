const router = require("express").Router();
const { auth, allwoedTo } = require("../../../config/auth");
const { uploadImage } = require("../../utils/uploadImage");

const {
  addBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("./brand.service");

router
  .route("/")
  .post(auth, allwoedTo("admin"), uploadImage("image", "brand"), addBrand)
  .get(auth, getAllBrands);
router
  .route("/:id")
  .get(auth, getBrand)
  .put(auth, allwoedTo("admin"), uploadImage("image", "brand"), updateBrand)
  .delete(auth, allwoedTo("admin"), deleteBrand);
module.exports = router;
