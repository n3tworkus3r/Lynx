import React, { useState, useEffect, useContext, useInsertionEffect } from "react"
import "./theme_changer.scss"
import "../../styles/variables.scss"
import { themeContext } from "../../../context/theme.context"

export const ThemeChanger = () => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////
  const {
    themeList,
    setThemeIndex
  } = useContext(themeContext)

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  ///////////////////////////////////

  const themeHandler = ({index}) => {
    console.log("[THEME CHANGER] INDEX: ", index)
    setThemeIndex(index)
  }

  ///////////////////////////////////
  //////////// RENDERING ////////////
  ///////////////////////////////////

  return (
    <div className="theme_container">
      { themeList.map((theme, index) =>
        <div className="theme_box" onClick={themeHandler(index)} key={index} >
          <div className="theme_item" style={{backgroundColor: theme}}></div>
        </div>
      )}
    </div>
  )
}
