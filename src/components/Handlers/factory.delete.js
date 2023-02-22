const { asyncHandllerError } = require("../../utils/Error/asyncHandlingError");
const ApiError = require("../../utils/Error/ApiError");

exports.deleteFactory = (Model) => {
  return asyncHandllerError(async (req, res, next) => {
    const { id } = req.params;
    const deleteDocument = await Model.findByIdAndDelete(id, {
      new: true,
    });
    !deleteDocument && next(new ApiError("not Found Document", 404));
    deleteDocument &&res.status(200).json({ success: true, data: deleteDocument });
  });
};
