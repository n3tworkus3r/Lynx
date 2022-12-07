const Router = require('express')
const router = Router()
const Tracks = require('../models/tracks')
const cors = require('cors')

/////////////////////////////////////////
//////// CORS POLICIES
/////////////////////////////////////////

const corsOptions = {origin:'http://localhost:3000'}

/////////////////////////////////////////
//////// CONTENT GENERATION
/////////////////////////////////////////

router.get('/library', cors(corsOptions), async (req,res) => {
  const track_list = await Tracks.find()
  res.status(200).json(track_list)
})

router.get('/get_tracks', cors(corsOptions), async (req,res) => {
  const track_list = await Tracks.find()
  res.status(200).json(track_list)
})


/////////////////////////////////////////
//////// TRACK EXECUTION
/////////////////////////////////////////

router.get('/library:id', async (req,res) => {
  //const track = await Tracks.findById(req.params.id)
  console.log()
  try {
    const track = await Tracks.find({'track_id': req.params.id})
    res.status(200).json({track})
  } catch (error) {
    console.log('FIND TRACK ERROR!')
  }

})



module.exports = router