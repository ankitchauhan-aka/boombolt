import mongoose from "mongoose";

const taxSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
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

taxSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Tax = mongoose.model("Tax", taxSchema);

export default Tax;
