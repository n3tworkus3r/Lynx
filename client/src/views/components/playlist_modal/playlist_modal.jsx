import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useHttp } from '../../../hooks/http.hook'
import './playlist_modal_content.scss'
import { Player } from '../player/player'
import { tracksContext } from '../../../context/tracks_context'

export const PlaylistContent = ({playlist_data}) => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  ////////// DATA FROM USEHTTP HOOK
  const { loading, request, error, clear_error } = useHttp()

  const [playlist, setPlaylist] = useState([])
  
  const [tracks, setTracks] = useState([])

  ////////// TRACK CONTEXT
  const playingTracks = useContext(tracksContext)

  ////////// PLAYER STATES
  const [playerActive, setPlayerActive] = useState(false)

  const [trackFinded, setTrackFinded] = useState(false)

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

  

  /////// PLAYABLE TRACK HANDLER
  const trackHandler = async (event, trackId) => {

    try {
      const track = await request('/library'+trackId, 'GET')
      const getTrackList = await request('/get_tracks', 'GET')

      console.log('CC'+getTrackList[0]['name'])

      tracksContext.playableTrack = [track['track'][0]['track_id'], track['track'][0]['src']]
      tracksContext.trackList = getTrackList

      console.log(tracksContext)

      setPlayerActive(true)
      setTrackFinded(true)

    } catch (error) { 
      console.log("CLIENT FIND TRACK ERROR!\n", error)
    }
  }
 
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
      <h1 className="playlist_modal_header">{playlist_data.name}</h1>
      {tracks.map(track =>
        <div className="playlist_track" onClick={(event) => trackHandler(event, track.track_id)} key={track._id}> {track.name} [ {track.artist} ] </div>
      )}

    <Player active={playerActive} setActive={setPlayerActive} trackFinded={trackFinded} setTrackFinded={setTrackFinded}></Player>
    </div>
  )
}