import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import {useDispatch} from 'react-redux'
import {login, logout} from './store/authSlice.js'
import {Header, Footer} from './components/index.js'
import { Outlet } from 'react-router'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then(userData => {
      if (userData) {
        dispatch(login( {userData }))
      } else {
        dispatch(logout())
      }
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  })

  return loading ? null : (
    <div>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
  
}

export default App
