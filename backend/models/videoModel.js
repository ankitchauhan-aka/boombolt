import mongoose from 'mongoose'

const videoSchema = mongoose.Schema(
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
    image:{
      type: String,
      required: true
    },
    mp4file: {
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

videoSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

const Video = mongoose.model('Video', videoSchema)

export default Video
