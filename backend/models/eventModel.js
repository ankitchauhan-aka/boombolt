import mongoose from 'mongoose'

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    location:{
      type:String
    },
    startfrom:{
      type:String
    },
    endson:{
      type:String
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
      required: true
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

eventSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

const Event = mongoose.model('Event', eventSchema)

export default Event
