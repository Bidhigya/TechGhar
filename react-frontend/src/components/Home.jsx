import React from 'react'


import { Link } from 'react-router-dom';
import FeaturedProducts from './products/FeaturedProducts';
import HeroSection from './HeroSection/HeroSection';
// import Slider1Img from "../assets/images/ecomm-banner-1.webp"
// import Slider2Img from "../assets/images/ecomm-banner-2.webp"
const Home = () => {
  return (
    <main className='section-1 motion-preset-slide-right motion-delay-500'>

 

<HeroSection/>


<FeaturedProducts/>

    </main>
    

  )
}

export default Home