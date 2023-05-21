import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../../../context/auth.context'
import { ThemeChanger } from '../theme_changer/theme_changer'
import axios from 'axios'
export const NavbarContent = ({active, set_active}) => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  const navigate = useNavigate()
  const auth = useContext(authContext)
  const token = auth.token

  const [id, setId] = useState([])

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  /////////////////////////////////// 

  ////////// AUTH HANDLERS
  const logoutHandler = event => {
    event.preventDefault()
    set_active(false)
    auth.logout()
    navigate('/')
  }


  ////////// GETTING DATA FROM DB (BY USERID)
  useEffect( () => {
    console.log("[NAVBAR] TOKEN: ", auth.token)
    console.log("[NAVBAR] USER ID: ", auth.user_id)
    //const base64Url = token.split('.')[1]
    //const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    //const payload = JSON.parse(window.atob(base64))

    //axios.get(`http://localhost:4000/user/data/${payload.userId}`)
    //.then(response => setId(response.data))
  }, [])

  ///////////////////////////////////
  ////////////// DEBUG //////////////
  ///////////////////////////////////

  ///////////////////////////////////
  //////////// RENDERING ////////////
  ///////////////////////////////////
  return(
  <div className={active ? "navbar_content" : "navbar_content inactive"} /*className="navbar"*/>
    <a id="close_nav_btn"  onClick={() => set_active(false)}>&#10006;</a>
    {/*<NavLink className="nav_link" to="/player">Player</NavLink>*/}
    <NavLink className="nav_link" to="/library">Library</NavLink>
    <NavLink className="nav_link" to="/playlists">Playlists</NavLink>
    <a to="/" className="nav_link" onClick={logoutHandler}>LogOut</a>
    {/*<ThemeChanger/>*/}
  </div>
)

}
