import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userAddressSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    postalCode: {
      type: String
    },
    city: {
      type: String
    },
    streetaddress: [
      {
        type: String
      }
    ],
    state: {
      type: String
    },
    country: {
      type: String
    },
    defaultAddress: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const userBillingAddressSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    postalCode: {
      type: String
    },
    city: {
      type: String
    },
    streetaddress: [
      {
        type: String
      }
    ],
    state: {
      type: String
    },
    country: {
      type: String
    },
    defaultAddress: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String
      // required: true,
    },
    lastName: {
      type: String
      // required: true,
    },
    phone: {
      type: String
    },
    email: {
      type: String,
      // required: true,
      unique: true
    },
    password: {
      type: String
    },
    otp: {
      type: String
    },
    file: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    addresses: [userAddressSchema],
    communicationPref: [
      {
        type: String
      }
    ],
    billingaddresses: [userBillingAddressSchema],
    whishlist: { type: Array, default: [], ref: "Product" },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
