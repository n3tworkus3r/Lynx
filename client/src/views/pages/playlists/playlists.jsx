import React, { useEffect, useState, useContext } from "react"
import axios from 'axios'
import "./playlists.scss"
import Modal from 'react-modal';
import { PlaylistContent } from "../../components/playlist_modal/playlist_modal";
import { authContext } from '../../../context/auth_context'
import { ReactComponent as AddPlaylist } from './interface/add.svg'
//'../../../../public/interface/playlists/add.svg'; // импортируем SVG-файл как React-компонент
export const PlaylistsPage = () => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  ////////// DATA FROM DB FOR RENDER
  const [playlists, setPlaylists] = useState([])

  Modal.setAppElement('#root')

  const [isPlaylistOpen, setPlaylistOpen] = useState(false)

  ////////// DATA FOR PASS TO MODAL
  const [playlistData, setPlaylistData] = useState(null)
  ////////// DATA FROM LOGIN CONTEXT
  const auth = useContext(authContext) 
  const token = auth.token

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  ///////////////////////////////////

  ////////// GETTING DATA FROM DB (BY USERID)
  useEffect( () => {
    //console.log("TOKEN INTO CLIENT: ", token)
    // PAYLOAD EXTRACTION
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    //axios.get('http://localhost:4000/playlists')
    axios.get(`http://localhost:4000/playlists/user/${payload.userId}`)
    .then(response => setPlaylists(response.data))
    //console.log("PLAYLISTS AFTER REQUEST: ", playlists)
  }, [])
  //////////
  
  ////////// ADD NEW PLAYLIST HANDLER
  const addPlaylist = () => {

  }
  //////////

  ////////// VIEWING PLAYLIST MODAL WINDOW
  const openPlaylist = (playlist) => {
    setPlaylistData(playlist) // SET PLAYLIST DATA
    setPlaylistOpen(true) // OPEN MODAL
  }

  const closePlaylist = () => {
    setPlaylistOpen(false)
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
  //////////// RENDERING ////////////
  ///////////////////////////////////
  //  src={require(playlist.img)}
  return(
  <div id="main" >
    <div className={ isPlaylistOpen ? "playlist_container blur" : "playlist_container"}>
        {playlists && playlists.length > 0 ? 
          (playlists.map(playlist =>
            <div className="playlist_column">
              <div className="playlist_card" onClick={() => openPlaylist(playlist)}>
                { playlist.img &&  <img className="playlist_image" src={playlist.img} alt="disk_img"/>}
                <div className="playlist_title"></div>
                <p className="playlist_track_name">{playlist.name}</p>
              </div>
            </div>
          )):(
            <div className="new_playlist_card" onClick={() => addPlaylist()}>
              <div className="add_playlist_btn">
                <AddPlaylist />
              </div>
            </div>
          )
        } 
        <div className="playlist_column">
          <div className="new_playlist_card" onClick={() => addPlaylist()}>
            <div className="add_playlist_btn">
              <AddPlaylist />
            </div>
          </div>
        </div>

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