import mongoose from "mongoose";

const homecategorySchema = mongoose.Schema(
  {
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    image: {
      type: String,
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

homecategorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

homecategorySchema.virtual("products", {
  ref: "Product", //The Model to use
  localField: "_id", //Find in Model, where localField
  foreignField: "categories", // is equal to foreignField
  justOne: false,
});
const HomeCategory = mongoose.model("HomeCategory", homecategorySchema);

export default HomeCategory;

