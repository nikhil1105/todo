import React from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const isUserSignedIn = !!localStorage.getItem('token')
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

  return (
    <nav className='main'>
        <Link className='link' to='/'><h1 className='link'>AuthDB</h1></Link>
        <ul className='main'>
            {isUserSignedIn ? (
                <>
                <Link className='link' to='/todo'><li>Account</li></Link>
                <li><button onClick={handleSignOut}>Sign Out</button></li>
                </>
            ) : (
                <>
                <Link className='link' to='/login'><li>Login</li></Link>
                <Link className='link' to='/signup'><li>Signup</li></Link>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar