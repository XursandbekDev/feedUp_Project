import React from 'react'
import Navbar from "./Navbar"
function Nav( { setSearch} ) {
  return (
    <nav className=' py-2 bg-white px-2  shadow-lg ' >
         <Navbar  setSearch={setSearch} />
    </nav>
  )
}

export default Nav;