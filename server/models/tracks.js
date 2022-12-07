const {Schema, model} = require('mongoose');

const Tracks = new Schema({
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
  }
})

module.exports = model('Tracks', Tracks)
