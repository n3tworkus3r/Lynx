import { createContext } from 'react'

export const tracksContext = createContext( {
  playableTrack: ['empty'],
  trackList: ['empty']
})