import React from 'react'
import { Routes, Route} from 'react-router-dom'
import { LoginPage } from './views/pages/login/login'
import { LibraryPage } from './views/pages/library/library'
import { PlaylistsPage } from './views/pages/playlists/playlists'

export const useRoutes = is_authenticated => {
  if (is_authenticated) {
    return (
      <Routes>
        <Route exact path='/' element={<PlaylistsPage/>}/>
        <Route exact path='/library' element={<LibraryPage/>}/>
        <Route exact path='/playlists' element={<PlaylistsPage/>}/>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route exact path='/' element={<LoginPage/>}/>
    </Routes>
  )

}