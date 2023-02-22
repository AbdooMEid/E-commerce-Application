const router = require("express").Router();
const { auth, allwoedTo } = require("../../../config/auth");
const {
  addCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("./coupon.service");

router.use(auth, allwoedTo("admin"));
router.route("/").post(addCoupon).get(getAllCoupons);
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon);
module.exports = router;
