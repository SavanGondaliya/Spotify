import React from 'react'
import Sidebar from './slidebar'
import Navbar from './navbar'
import './nav.css'

const Main = () => {
  return (
    <div className="main-page">
            <Sidebar />
                <Navbar />
        </div>
  )
}

export default Main
