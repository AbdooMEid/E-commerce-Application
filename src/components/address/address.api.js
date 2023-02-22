const router = require("express").Router();
const { auth, allwoedTo } = require("../../../config/auth");
const {
  addAddress,
  removeAddress,
  getAllAddress,
} = require("./address.service");

router.use(auth, allwoedTo("user"));
router.route("/").patch(addAddress).delete(removeAddress).get(getAllAddress);

module.exports = router;
