import mongoose from "mongoose";
import Product from "./productModel.js";

const brandSchema = mongoose.Schema(
  {
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
    image: {
      type: String,
      required: true,
    },
    home_include: {
      type: Boolean,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

brandSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

brandSchema.virtual('count', {
  ref: 'Product', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'brand', // is equal to foreignField
  justOne: false,
  count: true
});


const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
