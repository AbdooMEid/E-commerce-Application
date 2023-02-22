const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "user name required"],
      trim: true,
      minlength: [2, "too short user name"],
    },

    email: {
      type: String,
      required: [true, "email required"],
      trim: true,
      unique: [true, "email must be unique"],
    },
    phone: {
      type: String,
      required: [true, "phone required"],
    },

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "minlength 6 characters"],
    },
    passwordCahngeAt: { type: Date, default: Date.now() },
    profileImage: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    wishList: [{ type: Types.ObjectId, ref: "Product" }],
    address: [
      {
        name: String,
        slug: {
          type: String,
          lowercase: true,
        },
        street: String,
        city: String,
        phoneNumber: String,
      },
    ],
    // verfied: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

schema.post("init", (doc) => {
  doc.profileImage =
    process.env.IMAGE_URL.concat("userImage/") + doc.profileImage;
});
module.exports = model("User", schema);
