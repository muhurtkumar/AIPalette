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

const App = () => {

    const {showLogin} = useContext(AppContext)
  
    return (
      <div>
        <Navbar />
        <ToastContainer />
        {showLogin && <Login />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
        </Routes>
        <Footer />
      </div>
    )
}

export default App
