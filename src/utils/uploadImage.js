const multer = require("multer");
const ApiError = require("./Error/ApiError");
const path = require("path");

const options = (FileName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${FileName}`);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        Date.now() + "-" + Math.random() * 1000 + "-" + file.originalname
      );
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Images only", 400), false);
    }
  }
  const upload = multer({
    storage,
    fileFilter,
  });
  return upload;
};

exports.uploadImage = (fieldName, FileName) =>
  options(FileName).single(fieldName);

exports.uploadMixOfFile = (FieldNameArray, FileName) =>
  options(FileName).fields(FieldNameArray);
