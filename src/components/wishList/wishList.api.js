const router = require("express").Router();
const { auth, allwoedTo } = require("../../../config/auth");
const {
  addWishList,
  removeWishList,
  getAllWishList,
} = require("./wishList.service");

router.use(auth, allwoedTo("user"))
router
  .route("/")
  .patch(addWishList)
  .delete(removeWishList)
  .get(getAllWishList);

module.exports = router;
