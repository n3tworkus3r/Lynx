const {Schema, model} = require('mongoose');

const Playlists = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String
  },
  owner: {
    type: String
  },
  img: {
    type: String
  },
  tracks: [{
    type: Schema.Types.ObjectId,
    ref: 'Tracks'
  }]
})

module.exports = model('Playlists', Playlists)
