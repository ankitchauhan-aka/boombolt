import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    image: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const productSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    images: [
      {
        type: String,
        required: true
      }
    ],
    brand: {
      type: String,
      ref: "Brand"
    },
    specs: {
      type: String
    },
    warranty: {
      type: String
    },
    return: {
      type: String
    },
    related: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    bought_together: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
      }
    ],
    colors: [
      {
        type: String,
        ref: "Color"
      }
    ],
    size: [
      {
        type: String,
        ref: "Bagsize"
      }
    ],
    material: [
      {
        type: String,
        ref: "Material"
      }
    ],
    subcategory: [
      {
        type: String,
        ref: "Subcategory"
        // required: true
      }
    ],
    discount: {
      type: Number,
      // required: true,
      default: 0
    },
    short_desc: {
      type: String
    },
    height: {
      type: String
    },
    width: {
      type: String
    },
    depth: {
      type: String
    },
    weight: {
      type: String
    },
    shipping: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0
    },
    numReviews: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    sku: {
      type: String,
      required: true
    },
    model: {
      type: String
    },
    discount_price: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    },
    orders: {
      type: Number,
      default: 0
    },
    attr_type: {
      type: String,
      ref: "Specs"
    },
    attrs: { type: Object },
    active: {
      type: Boolean,
      default: true
    },
    nav_include: {
      type: Boolean,
      default: false
    },
    topDeals_include: {
      type: Boolean,
      default: false
    },
    featured_include: {
      type: Boolean,
      default: false
    },
    sale_include: {
      type: Boolean,
      default: false
    },
    newProduct_include: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: false
  }
);

productSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
