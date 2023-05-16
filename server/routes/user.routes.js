const Router = require('express')
const router = Router()

const Users = require('../models/users')

  
/////////////////////////////////////////
//////// USER DATA
/////////////////////////////////////////

//////// GET NAME
router.get('/user/data/name/:id', async (req,res) => {
  const user = await Users.findById(req.params.id)
  res.status(200).json(user.name)
})

//////// GET PLAYLISTS
router.get('/user/data/playlists/:id', async (req,res) => {
    const user = await Users.findById(req.params.id)
    res.status(200).json(user.playlists)
})

module.exports = router

