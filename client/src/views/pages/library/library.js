import React, { useEffect, useState } from "react"
import axios from 'axios'
import "./library.scss"
import { useHttp } from '../../../hooks/http.hook'
import { Player } from "../../components/player/player"


export const LibraryPage = () => {
  const [Tracks, setTracks] = useState([])
    useEffect( () => {
      axios.get('http://localhost:4000/library')
      .then(response => setTracks(response.data))
      
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
    {Tracks.map(track =>
      <div className="row">
        <div className="column">
          <div className="card">
            {/*<div className="title">{track.track_id} </div>*/}
            <img className="library_image" src={require('./disk.png')} alt="disk_img"/>
            <p className="track_name">{track.name} </p>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}