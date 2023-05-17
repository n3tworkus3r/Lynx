import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useHttp } from '../../../hooks/http.hook'
import './playlist_modal_content.scss'
import { PlayerModal } from '../player_modal/player_modal'
import { tracksContext } from '../../../context/tracks.context'

export const PlaylistContent = ({playlist_data}) => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  ////////// DATA FROM USEHTTP HOOK
  const { loading, request, error, clear_error } = useHttp()

  const [playlist, setPlaylist] = useState([])
  
  const [tracks, setTracks] = useState([])

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  /////////////////////////////////// 

  /////// GETTING DATA ABOUT PLAYLIST
  useEffect( () => {
    //console.log("PLAYLIST FOR REQUEST FOR SERVER", playlist_data)
    let playlist_id =  playlist_data._id
    //console.log("PLAYLIST_ID FOR SERVER", playlist_id)
    
    
    axios.get(`http://localhost:4000/playlists/${playlist_id}`)
      .then(response => {
        const requested_playlist = response.data
        console.log("[PLAYLIST MODAL] PLAYLIST FROM SERVER: ", requested_playlist)
        
        setTracks(requested_playlist.tracks)

        setPlaylist(requested_playlist)

        console.log("[PLAYLIST MODAL] TRACKS AFTER RESPONSE", requested_playlist.tracks)
      }
    )
  }, [])
 
  ////////////////////////////////////////
  //// PLAYER STATES
  ////////////////////////////////////////


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
      <div className="left_part">
        { playlist.img &&  <img className="playlist_modal_image" src={playlist.img} alt="disk_img"/>}
      </div>

      <div className="right_part">
        <h1 className="playlist_modal_header">{playlist_data.name}</h1>
        <PlayerModal tracks={tracks}></PlayerModal>
        {console.log("[PLAYLIST MODAL] TRACKS{x} AFTER RESPONSE", tracks)}
      </div>

      <div className="bottom_part">
        {tracks.map(track =>
          <div className="playlist_track" key={track._id}> {track.name} [ {track.artist} ] </div>
        )}
       
      </div>
      
     


    {/*<Player active={playerActive} setActive={setPlayerActive} trackFinded={trackFinded} setTrackFinded={setTrackFinded}></Player>*/}
    </div>
  )
}