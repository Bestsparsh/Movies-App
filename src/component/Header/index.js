import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Header = ({isLogin,formDataemail}) => {
  const [displayusername, displayusernameupdate] = useState('');
  const [showmenu, showmenuupdateupdate] = useState(false);
  const usenavigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
      if (location.pathname === '/signin' || location.pathname === '/signup') {
          showmenuupdateupdate(false);
      } else {
          showmenuupdateupdate(true);
          let username = sessionStorage.getItem('email');
          if (username === '' || username === null) {
              usenavigate('/signin');
          } else {
              displayusernameupdate(username);
          }
      }

  }, [location])
  return (
   <header> 
    <nav> 
        <Link to='/'>
        <img className='img-logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCJAQdHoJpU2CQJquq4UwwpdyuXef-TPtvtQ&usqp=CAU' alt=''/>
        </Link>


    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Link to='/favorites' className='favorites' style={{ textDecoration: 'none', borderRight: '1px solid #ccc', paddingRight: '10px' }}>
        Favorites
      </Link>
            {showmenu &&
                <div className='favorites' style={{ textDecoration: 'none', borderRight: '1px solid #ccc', paddingRight: '10px'}}>

                    {/* <Link to={'/'}>Home</Link>
                    <Link to={'/customer'}>Customer</Link> */}
                    <span >Welcome <b> {displayusername}| </b></span>
                    <Link style={{ float: 'right' , color:'white' }} to={'/signin'}>Logout</Link>
                </div>
            }
        
    </div>
 

    </nav>
   </header>
  )
}

export default Header