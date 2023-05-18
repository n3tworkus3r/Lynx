import React, { createContext, useState, useRef } from 'react'

export const tracksContext = createContext()

export const TracksProvider = ({ children }) => {
  const [trackList, setTrackList] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [playableTrackIndex, setPlayableTrackIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState([])
  const [trackProgress, setTrackProgress] = useState(false)

  const audioRef = useRef(new Audio())

  return (
    <tracksContext.Provider
      value={{
        trackList,
        setTrackList,

        currentTrack, 
        setCurrentTrack,

        playableTrackIndex,
        setPlayableTrackIndex,

        isPlaying,
        setIsPlaying,

        trackProgress, 
        setTrackProgress,

        audioRef
      }}
    >
      {children}
    </tracksContext.Provider>
  )
}