import React, { createContext, useState, useRef } from 'react'

export const tracksContext = createContext()

export const TracksProvider = ({ children }) => {
  const [trackList, setTrackList] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [playableTrackIndex, setPlayableTrackIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState([])

  const audioRef = useRef(new Audio())

  return (
    <tracksContext.Provider
      value={{
        trackList,
        setTrackList,

        currentTrack, 
        setCurrentTrack,

        isPlaying,
        setIsPlaying,

        playableTrackIndex,
        setPlayableTrackIndex,

        audioRef
      }}
    >
      {children}
    </tracksContext.Provider>
  )
}