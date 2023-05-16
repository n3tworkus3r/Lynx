import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';

import "./playlist_modal_content.scss"

export const PlaylistContent = ({playlist_data}) => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  //const navigate = useNavigate();

  const [playlist, setPlaylist] = useState([]);
  
  const [tracks, setTracks] = useState([]);

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  /////////////////////////////////// 

  /////// GETTING DATA ABOUT PLAYLIST
  useEffect( () => {
    //console.log("PLAYLIST FOR REQUEST FOR SERVER", playlist_data)
    let playlist_id =  playlist_data._id
    //console.log("PLAYLIST_ID FOR SERVER", playlist_id)
    
    console.log("PLAYLIST FROM SERVER BY REQUEST: ",
    axios.get(`http://localhost:4000/playlists/${playlist_id}`)
    .then(response => {
        const requested_playlist = response.data
        console.log(requested_playlist)
        
        setPlaylist(requested_playlist)
        setTracks(requested_playlist.tracks)
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

      <h1 className="playlist_modal_header">{playlist_data.name}</h1>
      {tracks.map(track =>
        <div className="playlist_track">{track.name}</div>
      )}
    </div>
  )
}