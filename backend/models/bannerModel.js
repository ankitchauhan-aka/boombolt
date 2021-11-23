import mongoose from 'mongoose'

const bannerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
    },
    short_desc: {
      type: String,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
      required: true
    },
    index: {
      type: Number
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

bannerSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

const Banner = mongoose.model('Banner', bannerSchema)

export default Banner
