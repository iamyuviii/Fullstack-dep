import React from 'react'
import './nav.css';
import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div className='nav'>
      <nav>
        < Link to='/'> Home</Link>
        < Link to='/Login'> Login</Link>
        < Link to='/Register'> Register</Link>
      </nav>
    </div>
  )
}

export default Navbar
