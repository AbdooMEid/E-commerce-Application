const router = require("express").Router();

router.use("/api/v1/category", require("../components/category/category.api"));
router.use(
  "/api/v1/subcategory",
  require("../components/subCategory/subCategory.api")
);
router.use("/api/v1/brands", require("../components/brand/brand.api"));
router.use("/api/v1/products", require("../components/product/product.api"));
router.use("/api/v1/users", require("../components/user/user.api"));
router.use("/api/v1/reviews", require("../components/review/review.api"));
router.use("/api/v1/wishList", require("../components/wishList/wishList.api"));
router.use("/api/v1/address", require("../components/address/address.api"));
router.use("/api/v1/coupons", require("../components/coupon/coupon.api"));

module.exports = router;
