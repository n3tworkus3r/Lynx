import React, { useEffect, useState } from "react"
import axios from 'axios'
import "./playlists.scss"
import Carousel from 'carousel-react-rcdev'

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
      <Carousel>
        <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
        <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
        <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
        <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
        <img src='https://via.placeholder.com/150' alt='imagem' title='imagem' />
    </Carousel>

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