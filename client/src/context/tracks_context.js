import { createContext } from 'react'

export const tracksContext = createContext( {
  playable_track: ['empty'],
  track_list: ['empty']
})