import React, { createContext, useState } from 'react'

export const tracksContext = createContext();

export const TrackProvider = ({ children }) => {
  const [trackList, setTrackList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)

  const addTrack = (track) => {
    setTrackList([...trackList, track])
  }

  const removeTrack = (index) => {
    const updatedTrackList = trackList.filter((_, i) => i !== index)
    setTrackList(updatedTrackList)
  }

  const selectTrack = (index) => {
    setSelectedIndex(index)
  }

  const contextValue = {
    trackList,
    //selectedIndex,
    //addTrack,
    //removeTrack,
    //selectTrack,
    setTrackList
  }

  return (
    <tracksContext.Provider value={contextValue}>
      {children}
    </tracksContext.Provider>
  )
}
