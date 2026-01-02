import React from 'react'
import Navbars from './common/Navbars'
import { Outlet } from 'react-router-dom'
import Footer from './common/Footer'

const Root = () => {
  return (
    <>
    <Navbars/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Root