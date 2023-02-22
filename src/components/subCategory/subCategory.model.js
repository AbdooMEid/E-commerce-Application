const { Schema, model, Types } = require("mongoose");

const subCategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name is must uniqe"],
      min: [2, "It must not be less than 4 "],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const subCategory = model("SubCategory", subCategorySchema);
module.exports = subCategory;
