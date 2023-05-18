import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import './playlist_modal_content.scss'
import { PlayerModal } from '../player_modal/player_modal'
import { tracksContext } from '../../../context/tracks.context'

export const PlaylistContent = ({playlist_data}) => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  ////////// DATA FROM USEHTTP HOOK

  const { trackList, setTrackList } = useContext(tracksContext) || {}

  const [playlist, setPlaylist] = useState([])
  
  const [tracks, setTracks] = useState([])

  const [playerActive, setPlayerActive] = useState(false)

  const [trackFinded, setTrackFinded] = useState(false)

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  /////////////////////////////////// 

  /////// GETTING DATA ABOUT PLAYLIST
  useEffect( () => {
    let playlist_id =  playlist_data._id
    axios.get(`http://localhost:4000/playlists/${playlist_id}`)
      .then(response => {
        const requested_playlist = response.data
        //console.log("[PLAYLIST MODAL] PLAYLIST FROM SERVER: ", requested_playlist)
        
        setTracks(requested_playlist.tracks)
        setPlaylist(requested_playlist)
        
        //console.log("[PLAYLIST MODAL] TRACKS FROM CONTEXT BEFORE", trackList)
        //console.log("[PLAYLIST MODAL] TRACKS DATA", requested_playlist.tracks)
        //addTrack(requested_playlist.tracks)
        setTrackList(requested_playlist.tracks)
        //console.log("[PLAYLIST MODAL] TRACKS FROM CONTEXT AFTER", trackList)
        //console.log("[PLAYLIST MODAL] TRACKS AFTER RESPONSE", requested_playlist.tracks)
      }
    )
  }, [])

  ////////////////////////////////////////
  //////////// PLAYABLE TRACK HANDLER
  ////////////////////////////////////////
  const trackHandler = async (event, track_id) => {

    try {
      //console.log("[PLAYLIST MODAL] TRACK INTO HANDLER: ", tracks)
      setPlayerActive(true)
      setTrackFinded(true)
    } catch (error) { 
      console.log("CLIENT FIND TRACK ERROR!\n", error)
    }
  }

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
      </div>

      <div className="bottom_part">
        {tracks.map(track =>
          <div className="playlist_track" onClick={(event) => trackHandler(event, track.track_id)} key={track._id}> {track.name} [ {track.artist} ] </div>
        )}
      </div>
    </div>
  )
}