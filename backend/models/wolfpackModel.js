import mongoose from "mongoose";

const wolfpackSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    orderItems: [
      {
        name: { type: String },
        description: { type: String, required: true },
        qty: { type: Number, required: true },
        color:[{type:String}],
        size:[{type:String}],
        image: { type: String, required: true },
        price: { type: String },
        sku: { type: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product"
        }
      }
    ],
    shippingAddress: {
      streetaddress: [{ type: String }],
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String }
    },
    billingAddress: {
      streetaddress: [{ type: String }],
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String }
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String }
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    deliveryInstruction: {
      type: String
    },
    giftMessage: {
      type: String
    },
    transactionId: {
      type: String,
      required: true
    },
    last4: {
      type: String,
      required: true
    },
    // color: { type: String },
    // size: { type: String },
    // qnty:{type:String},
    orderId: { type: String },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: {
      type: Date
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false
    },
    isCancelled: {
      type: Boolean,
      required: true,
      default: false
    },
    BOOMBOLTOrderId: {
      type: String
    },
    cancelReason: {
      type: String,
      default: ""
    },
    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

wolfpackSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

const WolfPack = mongoose.model("WolfPack", wolfpackSchema);

export default WolfPack;