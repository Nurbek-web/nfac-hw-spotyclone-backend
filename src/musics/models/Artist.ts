const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }]
})

const Artist = mongoose.model('Artist', artistSchema)

export default Artist
