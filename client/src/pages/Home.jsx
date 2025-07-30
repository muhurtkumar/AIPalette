import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <HowItWorks />
            <CallToAction />
            <Footer />
        </div>
    )
}

export default Home
