import mongoose, { Document, Schema } from 'mongoose'

export interface IMusic extends Document {
  name: string
  artist: string
  duration: string
  src: string
  date: Date
}

const MusicSchema: Schema = new Schema({
  name: { type: String, require: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  date: { type: Date, require: true },
  src: { type: String, require: true },
  duration: { type: String, require: true }
})

export default mongoose.model<IMusic>('Music', MusicSchema)
