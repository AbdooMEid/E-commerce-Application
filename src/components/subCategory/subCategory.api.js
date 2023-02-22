const router = require("express").Router({ mergeParams: true });
const { auth, allwoedTo } = require("../../../config/auth");
const {
  addSubCategory,
  getAllSubCategorys,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = require("./subCategory.service");

router
  .route("/")
  .post(auth, allwoedTo("admin"), addSubCategory)
  .get(getAllSubCategorys);
router
  .route("/:id")
  .get(getSubCategory)
  .put(auth, allwoedTo("admin"), updateSubCategory)
  .delete(auth, allwoedTo("admin"), deleteSubCategory);
module.exports = router;
