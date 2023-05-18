import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import './playlists.scss'
import Modal from 'react-modal'
import { AddPlaylistContent } from '../../components/add_playlist_modal/add_playlist_modal'
import { PlaylistContent } from '../../components/playlist_modal/playlist_modal'
import { authContext } from '../../../context/auth.context'
import { ReactComponent as AddPlaylist } from './interface/add.svg'
import { tracksContext } from '../../../context/tracks.context'

export const PlaylistsPage = () => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  const { trackList, isPlaying, setIsPlaying, currentTrack, setCurrentTrack, playableTrackIndex, setPlayableTrackIndex, audioRef } = useContext(tracksContext)

  ////////// DATA FROM DB FOR RENDER
  const [playlists, setPlaylists] = useState([])
  ////////// REACT MODAL OBJECT
  Modal.setAppElement('#root')
  ////////// PLAYLIST MODAL STATE
  const [isPlaylistOpen, setPlaylistOpen] = useState(false)
  ////////// DATA FOR PASS TO MODAL
  const [playlistData, setPlaylistData] = useState(null)

  ////////// ADD PLAYLIST MODAL STATE
  const [isAddPlaylistOpen, setAddPlaylistOpen] = useState(false)
  
  ////////// DATA FROM LOGIN CONTEXT
  const auth = useContext(authContext) 
  const token = auth.token
  const id = auth.user_id


  const [trackActive, setTrackActive] = useState(null)
  
  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  ///////////////////////////////////

  ////////// GETTING DATA FROM DB (BY USERID)
  useEffect( () => {
    // PAYLOAD EXTRACTION
    //const base64Url = token.split('.')[1]
    //const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    //const payload = JSON.parse(window.atob(base64))

    axios.get(`http://localhost:4000/playlists/user/${id}`)
    .then(response => setPlaylists(response.data))
    //console.log("PLAYLISTS AFTER REQUEST: ", playlists)
  }, [])

  //////////////////// PLAYLIST MODAL

  ////////// VIEWING PLAYLIST MODAL WINDOW
  const openPlaylist = (playlist) => {
    setPlaylistData(playlist) // SET PLAYLIST DATA
    setPlaylistOpen(true) // OPEN MODAL
  }

  const closePlaylist = () => {
    setPlaylistOpen(false)
    setIsPlaying(false)
    if(isPlaying) {
      setIsPlaying(true)
    }
    //console.log("[PLAYLISTS] CLOSE PLAYLIST: ")
    //audioRef.current.pause()
  }
  //////////


  //////////////////// ADD PLAYLIST MODAL
  
  ////////// ADD NEW PLAYLIST HANDLER
  const addPlaylist = () => {
    setAddPlaylistOpen(true) // OPEN MODAL
  }

  const closeAddPlaylist = () => {
    setAddPlaylistOpen(false)
  }
  //////////


  ////////// MOUSE SCROLL HANDLER
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler =(e) => {
    console.log('scroll')
  }
  //////////

  ///////////////////////////////////
  ////////////// DEBUG //////////////
  ///////////////////////////////////
  
  //console.log("[PLAYLISTS] USER ID: ", id)
  //console.log("[PLAYLISTS] TOKEN: ", token)
  //console.log("[PLAYLISTS] CURRENT TRACK: ", currentTrack)
  ///////////////////////////////////
  //////////// RENDERING ////////////
  ///////////////////////////////////

  return(
  <div id="main" >
    <div className={ isPlaylistOpen ? "playlist_container blur" : "playlist_container"}>
        {playlists && playlists.length > 0 ? 
          (playlists.map(playlist =>
            <div className="playlist_column" key={playlist._id}>
              <div className="playlist_card"  onClick={() => openPlaylist(playlist)}>
                { playlist.img &&  <img className="playlist_image" src={playlist.img} alt="disk_img"/>}
                <div className="playlist_title"></div>
                <p className="playlist_track_name">{playlist.name}</p>
              </div>
            </div>
          )):(
            <div></div>
          )
        } 
        <div className="playlist_column">
          <div className="new_playlist_card" onClick={() => addPlaylist()}>
            <div className="add_playlist_btn">
              <AddPlaylist/>
            </div>
          </div>
        </div>

        {openPlaylist && (<Modal 
          className="playlist_modal"
          overlayClassName="playlist_modal_overlay"
          isOpen={isPlaylistOpen}
          onRequestClose={closePlaylist}
        >
          <a className="playlist_modal_close_btn" onClick={closePlaylist}>&#10006;</a>
          <PlaylistContent playlist_data={playlistData}/>
        </Modal>)}

        {addPlaylist && (<Modal 
          className="add_playlist_modal"
          overlayClassName="playlist_modal_overlay"
          isOpen={isAddPlaylistOpen}
          onRequestClose={closeAddPlaylist}
        >
          <a className="playlist_modal_close_btn" onClick={closeAddPlaylist}>&#10006;</a>
          <AddPlaylistContent playlist_data={playlistData}/>
        </Modal>)}
    </div>
  </div>
  )
}