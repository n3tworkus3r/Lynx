import React, { useEffect, useState } from "react"
import axios from 'axios'
import "./playlists.scss"
import Modal from 'react-modal';
import { PlaylistContent } from "../../components/playlist_modal/playlist_modal";

export const PlaylistsPage = () => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  ////////// DATA FROM DB FOR RENDER
  const [playlists, setPlaylists] = useState([])

  Modal.setAppElement('#root')

  const [isPlaylistOpen, setPlaylistOpen] = useState(false);

  ////////// DATA FOR PASS TO MODAL
  const [playlistData, setPlaylistData] = useState(null); 

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  ///////////////////////////////////

  ////////// GETTING DATA FROM DB

  useEffect( () => {
    axios.get('http://localhost:4000/playlists')
    .then(response => setPlaylists(response.data))
  }, [])

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

  ////////// ОТОБРАЖЕНИЕ МОДАЛЬНОГО ОКНА ПЛЕЙЛИСТА
  const openPlaylist = (playlist) => {
    setPlaylistData(playlist) // SET PLAYLIST DATA
    setPlaylistOpen(true) // OPEN MODAL
  }

  const closePlaylist = () => {
    setPlaylistOpen(false)
  }

  ///////////////////////////////////
  //////////// RENDERING ////////////
  ///////////////////////////////////

  return(
  <div id="main" >
    <div className={ isPlaylistOpen ? "playlist_container blur" : "playlist_container"}>
        {playlists.map(playlist =>
          <div className="playlist_column">
            <div className="playlist_card" onClick={() => openPlaylist(playlist)}>
              <div className="playlist_title">{playlist.playlist_id} </div>
              <p className="playlist_track_name">{playlist.name} </p>
            </div>
          </div>
        )}

        {openPlaylist && (<Modal 
          className="playlist_modal"
          overlayClassName="playlist_modal_overlay"
          isOpen={isPlaylistOpen}
          onRequestClose={closePlaylist}
        >
          <div className="playlist_modal_close_btn" onClick={closePlaylist}>x</div>
          <PlaylistContent  playlist_data={playlistData}/>
        </Modal>)}
    </div>
  </div>
  )
}