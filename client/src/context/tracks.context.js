import { createContext } from 'react'

export const tracksContext = createContext( {
  playableTrackIndex: 0,
  trackList: ['empty']
})