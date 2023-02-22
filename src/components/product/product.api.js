const router = require("express").Router();
const { auth, allwoedTo } = require("../../../config/auth");
const { uploadMixOfFile } = require("../../utils/uploadImage");
const {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./product.service");
let Fields = [
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 4 },
];
router
  .route("/")
  .post(
    auth,
    allwoedTo("admin"),
    uploadMixOfFile(Fields, "product"),
    addProduct
  )
  .get(getAllProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(
    auth,
    allwoedTo("admin"),
    uploadMixOfFile(Fields, "product"),
    updateProduct
  )
  .delete(auth, allwoedTo("admin"), deleteProduct);
module.exports = router;
