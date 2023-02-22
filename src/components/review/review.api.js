const router = require("express").Router();
const { auth, allwoedTo } = require("../../../config/auth");
const {
  addReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("./review.service");

router.route("/").post(auth, allwoedTo("user"), addReview).get(getAllReviews);
router
  .route("/:id")
  .get(getReview)
  .put(auth, allwoedTo("user"), updateReview)
  .delete(auth, allwoedTo("admin", "user"), deleteReview);
module.exports = router;
