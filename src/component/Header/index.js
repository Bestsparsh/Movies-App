import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Header = () => {
  return (
   <header> 
    <nav> 
        <Link to='/'>
        <img 
        className='img-logo' 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCJAQdHoJpU2CQJquq4UwwpdyuXef-TPtvtQ&usqp=CAU'/>
        </Link>
        <Link to='/favorites'
              className='favorites text-right'
              style={{textDecoration: 'none'}}
        > 
        Favorites
        </Link>
    </nav>
   </header>
  )
}

export default Header