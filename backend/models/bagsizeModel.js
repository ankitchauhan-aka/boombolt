import mongoose from "mongoose";

const bagsizeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    minsize: {
      type: String,
    },
    maxsize: {
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

bagsizeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Bagsize = mongoose.model("Bagsize", bagsizeSchema);

export default Bagsize;
