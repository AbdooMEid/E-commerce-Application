const router = require("express").Router();
const { uploadImage } = require("../../utils/uploadImage");
const {
  addCategory,
  getAllCategorys,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("./category.service");
const subCategoryApi = require("../subCategory/subCategory.api");
const { auth, allwoedTo } = require("../../../config/auth");

router.use("/:categoryId/subcategory", subCategoryApi);

router
  .route("/")
  .post(auth, allwoedTo("admin"), uploadImage("image", "category"), addCategory)
  .get(getAllCategorys);
router
  .route("/:id")
  .get(getCategory)
  .put(
    auth,
    allwoedTo("admin"),
    uploadImage("image", "category"),
    updateCategory
  )
  .delete(auth, allwoedTo("admin"), deleteCategory);
module.exports = router;
