import mongoose from "mongoose";

const quoteSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
    imagedata: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

quoteSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const RequestQuoteMessage = mongoose.model("Quote", quoteSchema);

export default RequestQuoteMessage;
