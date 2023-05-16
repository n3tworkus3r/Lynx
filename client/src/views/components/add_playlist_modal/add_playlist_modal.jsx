import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';

import "./add_playlist_modal_content.scss"

export const PlaylistContent = ({playlistData}) => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  //const navigate = useNavigate();

  const [playlist, setPlaylist] = useState([])
  
  const [tracks, setTracks] = useState([])

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  /////////////////////////////////// 

  /////// GETTING DATA ABOUT PLAYLIST
  useEffect( () => {
    //console.log("[PLAYLIST MODAL] PLAYLIST FOR REQUEST FOR SERVER", playlist_data)
    let playlistId =  playlistData._id
    //console.log("[PLAYLIST MODAL] PLAYLIST_ID FOR SERVER", playlist_id)
    
    console.log("PLAYLIST FROM SERVER BY REQUEST: ",
    axios.get(`http://localhost:4000/playlists/${playlistId}`)
    .then(response => {
        const requestedPlaylist = response.data
        console.log(requestedPlaylist)
        
        setPlaylist(requestedPlaylist)
        setTracks(requestedPlaylist.tracks)
      }
    ))

    
  }, [])

  
  ///////////////////////////////////
  ////////////// DEBUG //////////////
  ///////////////////////////////////

//  console.log("PLAYLIST DATA: ", playlist_data)

//  console.log(setPlaylistData())

  ///////////////////////////////////
  //////////// RENDERING ////////////
  ///////////////////////////////////

  return(
    <div className="playlist_modal_content">

      <h1 className="playlist_modal_header">{playlistData.name}</h1>
      {tracks.map(track =>
        <div className="playlist_track" onClick={(event) => track_handler(event, track.track_id)} >{track.name}</div>
      )}
    </div>
  )
}