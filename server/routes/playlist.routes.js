const Router = require('express')
const router = Router()
const mongoose = require('mongoose')
const Playlists = require('../models/playlists')
const Tracks = require('../models/tracks')
const Users = require('../models/users')
const cors = require('cors')

/////////////////////////////////////////
//////// CORS POLICIES
/////////////////////////////////////////

const corsOptions = {origin:'http://localhost:3000'}

/////////////////////////////////////////
//////// GET ALL PLAYLISTS
/////////////////////////////////////////

router.get('/playlists', cors(corsOptions), async (req,res) => {
  const playlists_list = await Playlists.find()
  res.status(200).json(playlists_list)
})

/////////////////////////////////////////
//////// GET PLAYLISTS FOR USER
/////////////////////////////////////////

router.get('/playlists/user/:id', cors(corsOptions), async (req,res) => {
  
  const user = await Users.findById(req.params.id)
  .populate('playlists') // FIELD FOR FILLING DATA BY UUID
  .then(user => {
    //console.log("USER ID: ", req.params.id)
    //console.log("PLAYLIST FROM USER: ", user.playlists);
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
//////// ADD NEW PLAYLIST FOR USER
/////////////////////////////////////////

router.post('/playlists/add/:id', cors(corsOptions), async (req,res) => {
  const user_id = req.params.id
  //console.log("[ADD PLAYLIST] USER ID: ", user_id)
  const playlist = new Playlists({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name, 
    owner: req.body.owner,
    img: req.body.img,
    tracks: req.body.tracks
  })

  try { // Сохранение курса в БД
    await playlist.save()
    Users.findByIdAndUpdate(
      user_id,
      { $push: { playlists: playlist._id } },
      { new: true },
      (error, updatedDocument) => {
        if (error) {
          console.error('ERROR USER PLAYLISTS UPDATE:', error);
        } else {
          console.log('UPDATED USER PLAYLISTS:', updatedDocument);
        }
      }
    )
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
  Courses.findOneAndRemove({ _id: req.body.id }, (error, result) => {
    //console.log("[SERVER] PLAYLIST _ID: ", req.body.id)
    //console.log("[SERVER] PLAYLIST REMOVE")
    if (error) {
      console.error('Removing error:', error);
    } else {
      if (result) {
        console.log('Removed playlist:', result);
      } else {
        console.log('Playlist not found!');
      }
    }
  })
})
module.exports = router
