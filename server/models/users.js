const mongoose = require('mongoose') 
//const Playlists = './playlists'
const {Schema, model} = require('mongoose')
//const Playlists = mongoose.model('Playlists');
//const Playlists = mongoose.model('Playlists', Playlists)

const Users = new Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    //required: true
  },
  password: {
    type: String,
    //required: true
  },
  name: {
    type: String,
    //required: true
  },
  playlists: {
    type: [mongoose.model.Playlists],
    ref: 'Playlists'
  }
})

module.exports = model('Users', Users)







