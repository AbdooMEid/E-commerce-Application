const { auth, allwoedTo } = require("../../../config/auth");
const {
  signUp,
  signIn,
  updatePasswordUser,
  ProfileImage,
  verfiedAccount,
} = require("./user.auth");
const {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require("./user.service");
const { uploadImage } = require("../../utils/uploadImage");
const router = require("express").Router();

router
  .route("/")
  .post(auth, allwoedTo("admin"), addUser)
  .get(auth, allwoedTo("admin"), getAllUsers);
router
  .route("/:id")
  .get(auth, allwoedTo("admin"), getUser)
  .put(auth, allwoedTo("admin"), updateUser)
  .delete(auth, allwoedTo("admin"), deleteUser);
router
  .route("/changePassword/:id")
  .patch(auth, allwoedTo("admin"), updatePassword);

// user auth
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/changePasswordUser").patch(auth, updatePasswordUser);
router
  .route("/profileImage")
  .patch(auth, uploadImage("profileImage", "userImage"), ProfileImage);
// router.route("/check/:id").patch(verfiedAccount);
module.exports = router;
