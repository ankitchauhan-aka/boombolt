import mongoose from "mongoose";

const materialSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

materialSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

const Material = mongoose.model("Material", materialSchema);

export default Material;
