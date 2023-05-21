import React, { createContext, useState, useRef } from 'react'

export const themeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [themeList, setThemeList] = useState(["#a31717", "#4b19ff", "#333"])
  const [backgroundColorList, setBackgroundColorList] = useState(["#131a24", "#333"])
  const [mainColorList, setMainColorList] = useState(["#202e3d", "#fff"])

  const [themeIndex, setThemeIndex] = useState(0)

  const [themeColor, setThemeColor] = useState(themeList[0])
  const [backgroundColor, setBackgroundColor] = useState(backgroundColorList[0])
  const [mainColor, setMainColor] = useState(mainColorList[0])

  document.documentElement.style.setProperty('--themeColor', themeColor)
  document.documentElement.style.setProperty('--backgroundColor', backgroundColor)
  document.documentElement.style.setProperty('--mainColor', mainColor)

  return (
    <themeContext.Provider
      value={{
        backgroundColor,
        setBackgroundColor,

        backgroundColorList, 
        setBackgroundColorList,

        mainColor,
        setMainColor,

        mainColorList, 
        setMainColorList,

        themeList,
        setThemeList,

        themeColor, 
        setThemeColor,

        themeIndex, 
        setThemeIndex
      }}
    >
      {children}
    </themeContext.Provider>
  )
}