import React, { createContext, useState } from 'react'

export const tracksContext = createContext()

export const TracksProvider = ({ children }) => {
  const [trackList, setTrackList] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [playableTrackIndex, setPlayableTrackIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState([])

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
        setPlayableTrackIndex
      }}
    >
      {children}
    </tracksContext.Provider>
  )
}