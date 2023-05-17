const Router = require('express')
const router = Router()
const Playlists = require('../models/playlists')
const Tracks = require('../models/tracks')
const Users = require('../models/users')
const cors = require('cors')

/////////////////////////////////////////
//////// CORS POLICIES
/////////////////////////////////////////

const corsOptions = {origin:'http://localhost:3000'}

/////////////////////////////////////////
//////// RETURN ALL PLAYLISTS
/////////////////////////////////////////

router.get('/playlists', cors(corsOptions), async (req,res) => {
  const playlists_list = await Playlists.find()
  res.status(200).json(playlists_list)
})

router.get('/playlists/user/:id', cors(corsOptions), async (req,res) => {
  
  const user = await Users.findById(req.params.id)
  .populate('playlists') // FIELD FOR FILLING DATA BY UUID
  .then(user => {
    console.log("USER ID: ", req.params.id)
    console.log("REQUESTED USER: ", user)
    console.log("PLAYLIST FROM USER: ", user.playlists);
    
    
    res.status(200).json(user.playlists)
  })
  .catch(err => {
    console.error(err);
  });
})





/////////////////////////////////////////
//////// RETURN REQUESTED PLAYLIST
/////////////////////////////////////////

router.get('/playlists/:id', cors(corsOptions), async (req,res) => {
    //console.log("REQUEST FROM CLIENT: ",req )
    //console.log("ID FROM CLIENT:",req.params.id)
    
    // SIMPLE RESPONCE
    //const playlist = await Playlists.findById(req.params.id)

    // RESPONCE WITH POPULATE (EXTENDS TRACKS DATA)
    const playlist = await Playlists.findById(req.params.id)
    .populate('tracks') // FIELD FOR FILLING DATA
    .then(playlist => {
      console.log("REQUESTED PLAYLIST: ", playlist)
      //console.log("TRACKS FROM PLAYLIST: ", playlist.tracks);
      res.status(200).json(playlist)
    })
    .catch(err => {
      console.error(err);
    });
})

/////////////////////////////////////////
//////// ADD PLAYLIST
/////////////////////////////////////////

router.post('/playlists/add', cors(corsOptions), async (req,res) => {

  console.log(req.body)
  const playlist = new Playlists({
      name: req.body.name, 
      owner: req.body.owner,
      img: req.body.img,
      tracks: req.body.tracks
  })

  try{ // Сохранение плейлиста в БД
      await playlist.save()
      res.redirect('/playlists')
  } catch(err) {
      console.log(err)
  }
  res.status(201).json()
})


/////////////////////////////////////////
//////// EDIT PLAYLIST
/////////////////////////////////////////

router.post('/playlists/edit', cors(corsOptions), async (req,res) => {

  console.log("PLAYLIST REQ BODY", req.body)

  const new_playlist = new Playlists({
    name: req.body.name, 
    owner: req.body.owner,
    img: req.body.img,
    tracks: req.body.tracks
  })
  
//  console.log("PLAULIST AFTER REQ", new_playlist)

  try{ // Редактирование курса
    Playlists.findOneAndUpdate({ id: new_playlist.id }, {
        name: req.body.name, 
        owner: req.body.owner,
        img: req.body.img,
        tracks: req.body.tracks
      }, { new: false }, function(err, new_playlist) {
      if (err) {
        console.log('Ошибка при замене курса:', err);
      } else {
        console.log('Заменен курс:', new_playlist);
      }
    });

  } catch(err) {
      console.log(err)
  }
  res.status(201).json()
})


/////////////////////////////////////////
//////// REMOVE PLAYLIST
/////////////////////////////////////////

router.post('/playlists/remove', cors(corsOptions), async (req,res) => {
  const id = req.body.id;
  const name = req.body.name;

  Playlists.findOneAndRemove()
})

module.exports = router
