import mongoose from "mongoose";
import Product from "./productModel.js";

const specsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    attrs: [{ value: { type: String, required: true } }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

specsSchema.virtual("id").get(function() {
  return this._id.toHexString();
});
const Specs = mongoose.model("Specs", specsSchema);

export default Specs;
