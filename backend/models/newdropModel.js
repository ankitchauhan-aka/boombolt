import mongoose from "mongoose";

const newdropSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    backimage: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

newdropSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

const NewDrop = mongoose.model("NewDrop", newdropSchema);

export default NewDrop;
