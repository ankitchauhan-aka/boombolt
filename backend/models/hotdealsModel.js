import mongoose from "mongoose";

const hotdealSchema = mongoose.Schema(
  {
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    fromdate: {
      type: String,
    },
    todate: {
      type: String,
    },
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

hotdealSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

hotdealSchema.virtual("products", {
  ref: "Product", //The Model to use
  localField: "_id", //Find in Model, where localField
  foreignField: "categories", // is equal to foreignField
  justOne: false,
});
const HotDeal = mongoose.model("HotDeal", hotdealSchema);

export default HotDeal;
