const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
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
    image: String,
  },
  { timestamps: true }
);
categorySchema.post("init", (doc) => {
  doc.image = process.env.IMAGE_URL.concat("category/") + doc.image;
});
const category = mongoose.model("Category", categorySchema);
module.exports = category;
