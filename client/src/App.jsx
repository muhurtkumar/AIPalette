import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Explore from './pages/Explore'
import Footer from './components/Footer'

const App = () => {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
        </Routes>
        <Footer />
      </div>
    )
}

export default App
