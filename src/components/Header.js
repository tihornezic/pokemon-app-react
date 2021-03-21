import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../img/img_poke_logo.png'

const Header = () => {

    // console.log(window.location.pathname)

    return (
        <header>
            <div className='container'>
                <div className='inner-content'>
                    <Link to='/'><img src={logo} alt="poke-logo" width='150px' /></Link>
                    {window.location.pathname === '/'
                        ?
                        <ul className='header-links'>
                            <li><Link to='/pokemon-list'>Pokemon list</Link></li>
                        </ul>
                        :
                        <></>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
