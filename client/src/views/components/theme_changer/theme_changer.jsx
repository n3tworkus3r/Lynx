import React, { useState, useEffect, useRef, useInsertionEffect } from "react"
//import Backdrop from "./Backdrop"
import "./theme_changer.scss"
import "../../styles/variables.scss"
import userEvent from "@testing-library/user-event";


export const ThemeChanger = ({active, set_active }) => {
  
  const [theme, changeTheme] = useState(0);
/*
  const theme_handler = async () => {

    changeTheme(theme === 'theme_1' ? 'theme_2' : 'theme_1');

    useEffect() => {
      const bg_color = `var($background_color- )`
    }, [theme]
  
  }
*/
  return (
  <div className={active ? "player_container active" : "player_container"}>
    <button onClick={theme_handler}> THEME</button>
  </div>
  )
}
