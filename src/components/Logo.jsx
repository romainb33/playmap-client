import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <header className="Logo white">
            <Link className= "white" to="/">
                <p>Playmap.</p>
            </Link>
        </header>
    )
}

export default Logo
