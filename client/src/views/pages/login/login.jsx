import React, { useContext, useEffect, useState } from 'react'
import './login.scss'
import axios from 'axios'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import { authContext } from '../../../context/auth.context'

export const LoginPage = () => { 
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  const message = useMessage()
  const auth = useContext(authContext) 
  const { loading, request, error, clear_error } = useHttp()
  const [ form, setForm ] = useState({ login: '', password: '' })

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  ///////////////////////////////////

  //////////// CHANGE FORM HANDLER
  const changeFormHandler = event => { 
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  //////////// ERRORS VALIDATION
  useEffect( () => {
    message(error)
    clear_error()
  }, [ error, message, clear_error ])

  //////////// SIGN UP VALIDATION
  const registerHandler = async () => {
    try {
      const data = await request('/auth/register', 'POST', {...form})
      console.log('DATA', data)
    } catch (error) { }
  }

  //////////// SIGN IN HANDLER
  const loginHandler = async () => {
    axios.post('/auth/login',  {...form})
    .then(response => {
      //console.log("[LOGIN] FORM DATA: ", {...form})
      //console.log("[LOGIN] RESPONSE DATA: ",response.data)

      const id = response.data.id
      const token = response.data.token

      auth.login(token, id) // CONTEXT FILLING

      //console.log("[LOGIN] USER ID: ", id)
      //console.log("[LOGIN] TOKEN: ", token)

      localStorage.setItem('token', token)
    })
    .catch(error => {
      console.error(error)
    })
  }

  ///////////////////////////////////
  //////////// RENDERING ////////////
  ///////////////////////////////////

  return(
    <div id="login_box">
      <div className="login_form">
        <span id="login_title">LYNX<br/></span>
        <input  className="login_content" type="text" name="login" placeholder="Username" onChange={changeFormHandler} required/>
        <input className="login_content" type="password" name="password" placeholder="Password" onChange={changeFormHandler} required/>
        <button className="login_content" id="login_btn" type="submit" value="Login" onClick={loginHandler}>Login</button>
        <button className="login_content" id="login_btn" type="submit" value="Register" onClick={registerHandler} disabled={loading}>Register</button>
      </div>
    </div>
  )
}