import React, { useEffect, useState } from "react"
import axios from 'axios'
import "./playlists.scss"
import Carousel from "../../components/carousel/carousel"




export const PlaylistsPage = () => {

  ////////////////////////////////////////
  //// GETTING DATA FROM DB
  ////////////////////////////////////////
  const [items, setPlaylists] = useState([])

    useEffect( () => {
      axios.get('http://localhost:4000/library')
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

    <div className="carousel_container">
      <Carousel _class='items'>
        {items.map(playlist =>
          <div className="column">
            <div className="card">
              <div className="title">{playlist.id} </div>
              <p className="track_name">{playlist.name} </p>
            </div>
          </div>
          
        )}  
      </Carousel>
    </div>
  </div>
  )
}