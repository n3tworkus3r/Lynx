import { createContext } from 'react'

function dummy() {}

export const authContext = createContext( {
  token: null,
  user_id: null,
  login: dummy,
  logout: dummy,
  isAuthenticated: false
})