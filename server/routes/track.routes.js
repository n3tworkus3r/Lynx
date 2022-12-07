const Router = require('express')
const router = Router()

const Users = require('../models/users')
const Tracks = require('../models/tracks')


/////////////////////////////////////////
//////// CONTENT GENERATION
/////////////////////////////////////////

router.get('/get_tracks', async (req,res) => {
  const track_list = await Tracks.find()
  res.status(200).json(track_list)
})
  
/////////////////////////////////////////
//////// TRACK EXECUTION
/////////////////////////////////////////

router.get('/library:id', async (req,res) => {
  //const task = await Tracks.findById(req.params.id)
  res.status(201).json({message : 'Ok!'})
})

module.exports = router