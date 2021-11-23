import mongoose from "mongoose";

const colorSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    colorcode: {
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

colorSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Color = mongoose.model("Color", colorSchema);

export default Color;
