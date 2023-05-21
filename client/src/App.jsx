import { useRoutes } from './routes'
import React, { useState } from 'react'
import { useAuth } from './hooks/auth.hook'
import { authContext } from './context/auth.context'
import { TracksProvider } from './context/tracks.context'
import { ThemeProvider } from './context/theme.context'
import { BrowserRouter as Router } from 'react-router-dom'
import { NavbarBtn } from './views/components/navbar/navbar_button'
import { Background } from './views/components/background/background'
import { NavbarContent } from './views/components/navbar/navbar_content'
//import './context/theme'
function App() {

  const [navbar_active, set_navbar_active] = useState(false)
  const {token, login, logout, user_id} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <ThemeProvider>
      <TracksProvider>
        <authContext.Provider value= {{token, login, logout, user_id, isAuthenticated}}>
          <Router> 
            { isAuthenticated && <NavbarBtn set_active={set_navbar_active} /> }
            <div>
              {routes}
            </div>
            <NavbarContent active={navbar_active} set_active={set_navbar_active} />
            <Background/>
          </Router>
        </authContext.Provider>
      </TracksProvider>
    </ThemeProvider>
    
  )
}

export default App
