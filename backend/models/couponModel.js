import mongoose from 'mongoose'

const couponSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    coupon_type: {
      type: String
    },
    weightage: {
      type: Number
    },
    total: {
      type: Number,
      required: true
    },
    used: {
      type: Number,
      default: 0,
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

couponSchema.virtual("id").get(function () {
  return this._id.toHexString();
});


const Coupon = mongoose.model('Coupon', couponSchema)

export default Coupon;
