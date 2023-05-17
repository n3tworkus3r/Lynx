import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';

import "./add_playlist_modal_content.scss"

export const AddPlaylistContent = ({playlistData}) => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  const navigate = useNavigate();

  const [formData, setFormData] = useState({})

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  /////////////////////////////////// 

  /////// FORM DATA HANDLE

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formData)
    try {
      const response = await fetch('/playlists/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Server responce :', data)

      navigate(0); // Перенаправление на страницу курсов

      console.log('Nav')
    } catch (error) {
      console.error('Error: ', error)
    }
  }
  
  ///////////////////////////////////
  ////////////// DEBUG //////////////
  ///////////////////////////////////

//  console.log("PLAYLIST DATA: ", playlist_data)

//  console.log(setPlaylistData())

  ///////////////////////////////////
  //////////// RENDERING ////////////
  ///////////////////////////////////

  return(
    <div className="add_playlist_modal_content">
      <h1 className="add_playlist_modal_header"> NEW PLAYLIST</h1>
        <form onSubmit={handleSubmit}>
        <label for="playlist_name" className="add_playlist_label">Playlist name</label>
        <input className="add_playlist_input" id="playlist_name" name="name" type="text" placeholder="Playlist name" onChange={handleInputChange} required/>
      
        <label for="playlist_description" className="add_playlist_label">Playlist description</label>
        <textarea className="add_playlist_textarea" id="playlist_description" name="description" placeholder="Description" onChange={handleInputChange}/>

        <button className="save_playlist_btn" type="submit">SAVE PLAYLIST</button>
      </form>
    </div>
  )
}