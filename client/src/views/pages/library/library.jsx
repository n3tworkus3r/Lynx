import React, { useEffect, useState, useContext} from 'react'
import axios from 'axios'
import './library.scss'
import { useHttp } from '../../../hooks/http.hook'
import { Player } from '../../components/player/player'
import { tracksContext } from '../../../context/tracks.context'
import Carousel from '../../components/carousel/carousel'

export const LibraryPage = () => {
  ////////////////////////////////////////
  //// TRACK CONTEXT
  ////////////////////////////////////////

  const tracks_context = useContext(tracksContext) 

  ////////////////////////////////////////
  //// GETTING DATA FROM DB
  ////////////////////////////////////////
  const [Tracks, setTracks] = useState([])

  useEffect( () => {
    axios.get('http://localhost:4000/library')
    .then(response => setTracks(response.data))
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler =(e) => {
    console.log('scroll')
  }

  const {request} = useHttp()

  ////////////////////////////////////////
  //// PLAYABLE TRACK HANDLER
  ////////////////////////////////////////
  const track_handler = async (event, track_id) => {

    try {
      const track = await request('/library'+track_id, 'GET')
      const get_track_list = await request('/get_tracks', 'GET')

      console.log('CC'+get_track_list[0]['name'])

      tracks_context.playable_track = [track['track'][0]['track_id'], track['track'][0]['src']]
      tracks_context.track_list = get_track_list

      console.log(tracks_context)

      set_player_active(true)
      set_track_finded(true)

    } catch (error) { 
      console.log("CLIENT FIND TRACK ERROR!\n", error)
    }
  }
 
  ////////////////////////////////////////
  //// PLAYER STATES
  ////////////////////////////////////////

  const [playerActive, set_player_active] = useState(false)

  const [track_finded, set_track_finded] = useState(false)

  ////////////////////////////////////////
  //// ОБЪЕКТ С ТРЕКАМИ
  ////////////////////////////////////////

  //const tracks1 = [['1',"http://127.0.0.1:8080/KLOUD - THE HIVE.mp3"],['2','http://127.0.0.1:8080/2.mp3'],['3','http://127.0.0.1:8080/3.mp3'],['4','http://127.0.0.1:8080/4.mp3']]

  return(
  <div id="main">
 
    {/*<Player active={playerActive} set_active={set_player_active} track_finded={track_finded} set_track_finded={set_track_finded}></Player>*/}
  
    <div className="row">
    <div className="carousel_container">
      <Carousel _class='items'>
      {Tracks.map(track =>

          <div className="column" key={track._id}>

            <div className="card" onClick={(event) => track_handler(event, track.track_id)}>
              {/*<div className="title">{track.track_id} </div>*/}
              <img className="library_image" src={require('./disk.png')} alt="disk_img"/>
              <p className="track_name">{track.name} </p>
            </div>
        </div>
      )}
      </Carousel>
    </div>
    </div>
  </div>
  )
}