import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    nav_include: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      // required: true
    },
    home_include: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    parent: {
      type: String,
      ref: "Category",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.virtual('products', {
  ref: 'Product', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'categories', // is equal to foreignField
  justOne: false
});
const Category = mongoose.model("Category", categorySchema);

export default Category;
