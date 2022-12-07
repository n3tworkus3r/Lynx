import React, { useEffect, useState } from "react"
import axios from 'axios'
import "./playlists.scss"

export const PlaylistsPage = () => {

  const [playlists, setPlaylists] = useState([])

    useEffect( () => {
      axios.get('http://localhost:4000/get_tracks')
      .then(response => setPlaylists(response.data))
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

  return(
  <div id="main">

    {/*
    <div className="row">
      <div className="column">
        <div className="playlist_card">
          <img className="playlist_image" src={require('./playlists/img/1.jpg')} alt="playlist_img"/>
          {/*<p className="track_name">track name 1</p>*/}
     {/*    </div>
      </div>

      <div className="column">
        <div className="playlist_card">
          <img className="playlist_image" src={require('./playlists/img/2.jpg')} alt="playlist_img"/>
          {/*<p className="track_name">track name 1</p>*/}
     {/*    </div>
      </div>

      <div className="column">
        <div className="playlist_card">
          <img className="playlist_image" src={require('./playlists/img/3.jpg')} alt="playlist_img"/>
          {/*<p className="track_name">track name 1</p>*/}
     {/*    </div>
      </div>

      <div className="column">
        <div className="playlist_card">
          <img className="playlist_image" src={require('./playlists/img/4.jpg')} alt="playlist_img"/>
          {/*<p className="track_name">track name 1</p>*/}
     {/*    </div>
      </div>
    */}   
        {playlists.map(playlist =>
          <div className="column">
          <div className="card">
            <div className="title">{playlist.id} </div>
            <p className="track_name">{playlist.name} </p>
            {/*<img src={playlist.}/>*/}
          </div>
          </div>
        )}  

      {/* DYNAMIC PAGINATION 
        {playlists.map(playlist =>
          <div className="column">
          <div className="card">
            <div className="title">{playlist.id} </div>
            <img src={playlist.thumbnailUrl}/>
          </div>
          </div>
        )}  
        */}        
    {/*</div> */}  
  </div>
  )
}