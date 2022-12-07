const {Schema, model} = require('mongoose');

const Playlists = new Schema({
  playlist_id: {
    type: Number
  },
  name: {
    type: String
  },
  owner: {
    type: String
  },
  img: {
    type: String
  },
  track_count: {
    type: Number
  }
})

module.exports = model('Playlists', Playlists)
