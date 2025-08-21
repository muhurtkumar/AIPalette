import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Explore from './pages/Explore'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import Generate from './pages/Generate'
import Profile from './pages/Profile'
import ViewPalette from './pages/ViewPalette'
import VisualizePalette from './pages/VisualizePalette'

const App = () => {

    const {showLogin, userToken} = useContext(AppContext)
  
    return (
      <div>
        <Navbar />
        <ToastContainer />
        {showLogin && <Login />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/generate' element={<Generate />} />
          <Route path='/palette/:id' element={<ViewPalette />} />
          <Route path='/visualize/:paletteId' element={<VisualizePalette />} />
          {userToken && <Route path='/profile' element={<Profile />} />}
        </Routes>
        <Footer />
      </div>
    )
}

export default App
