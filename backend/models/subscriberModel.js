import mongoose from 'mongoose'

const subscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
)

subscriberSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema)

export default Subscriber
