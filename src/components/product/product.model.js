const { Schema, model, Types } = require("mongoose");

const productSchema = Schema(
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
    description: {
      type: String,
      trim: true,
      min: [2, "It must not be less than 4"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity required"],
      default: 0,
    },
    colors: [String],
    price: {
      type: Number,
      required: [true, "Product price required"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "Product price after discount required"],
    },
    sold: {
      type: Number,
      required: [true, "Product sold required"],
      default: 0,
    },
    imageCover: String,
    images: [String],
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "Product category required"],
    },
    subcategory: {
      type: Types.ObjectId,
      ref: "SubCategory",
      required: [true, "Product subcategory required"],
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
      required: [true, "Product brand required"],
    },
    averageRating: {
      type: Number,
      min: [1, "ratingAverage must be greater than 1"],
      max: [5, "ratingAverage must be less than 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.virtual("review", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});
productSchema.pre("findOne", function () {
  this.populate("review");
});
productSchema.post("init", (doc) => {
  let imags = [];
  doc.imageCover = process.env.IMAGE_URL.concat("product/") + doc.imageCover;
  doc.images.forEach((elm) => {
    imags.push(process.env.IMAGE_URL.concat("product/") + elm);
  });
  doc.images = imags;
});
const Product = model("Product", productSchema);
module.exports = Product;
