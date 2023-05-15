const {Schema, model} = require('mongoose');

const Tracks = new Schema({
  _id: Schema.Types.ObjectId,
  track_id: {
    type: Number,
  },
  name: {
    type: String,
  },
  artist: {
    type: String,
  },
  img: {
    type: String,
  },
  src: {
    type: String,
  },
  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Playlists'
  }]
})

module.exports = model('Tracks', Tracks)