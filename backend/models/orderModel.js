import mongoose from "mongoose";
const orderSchema = mongoose.Schema(
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
        color: [{ type: String }],
        size: [{ type: String }],
        image: { type: String, required: true },
        price: { type: String },
        sku: { type: String },
        warranty: { type: String },
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
      type: String
      // required: true
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String }
    },
    taxPrice: {
      type: Number,
      // required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      // required: true,
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
      type: String
      // required: true
    },
    orderId: { type: String },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: {
      type: Date
    },
    shipment_id: {
      type: String
    },
    order_id: {
      type: String
    },
    awb_code: {
      type: String
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
    isReturned: {
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
    returnReason: {
      type: String,
      default: ""
    },
    deliveredAt: {
      type: Date
    },
    payment_id: {
      type: String,
      default: ""
    },
    courier_name: {
      type: String,
      default: ""
    },
    label_url: {
      type: String,
      default: ""
    },
    manifest_url: {
      type: String,
      default: ""
    },
    pickup_scheduled_date: {
      type: String,
      default: ""
    },
    pickup_token_number: {
      type: String,
      default: ""
    },
    routing_code: {
      type: String,
      default: ""
    },
    success: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

orderSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

orderSchema.post("validate", function(doc) {
  console.log("%s has been validated (but not saved yet)", doc._id);
  var today = new Date();
  var dd = today.getDate();
  var year = today.getYear().toString();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  // 6050a5a896ae3b5fb71c7b7b
  console.log(
    year.substring(year.length - 2),
    " hdguf jhfd fjdvbf ",
    monthNames[today.getMonth()].substring(0, 3)
  );
  var year_last = year.substring(year.length - 2);
  var month = monthNames[today.getMonth()].substring(0, 3);
  doc.BOOMBOLTOrderId =
    "BOOMBOLT-" +
    month +
    "" +
    year_last +
    "-" +
    doc.id.substring(doc.id.length - 6);
});
const Order = mongoose.model("Order", orderSchema);

export default Order;
