import mongoose from "mongoose";

const stateSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tax_region: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true,
      unique: true
    },
    state_rate: {
      type: Number,
      required: true
    },
    shipping_charge: {
      type: Number,
      required: true,
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

stateSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const State = mongoose.model("State", stateSchema);

export default State;
