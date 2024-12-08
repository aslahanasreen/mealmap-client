import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userAuthContext } from '../contextApi/ContextApi';
import { useContext } from 'react';

function Header() {

  const nav = useNavigate()
  const {authResponse,setAuthResponse} = useContext(userAuthContext)

  const handleLogout = ()=>{
    nav('/')
    sessionStorage.clear()
    setAuthResponse(false)
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
         <Link to={'/home'} style={{textDecoration:'none'}} className='text-dark'>
            <i className="fa-solid fa-utensils fa-xl" style={{color: "#4ba040"}} />{' '}
              MealMap
         </Link>
          </Navbar.Brand>
          <div className='d-flex '>
            <Link to={'/uprofile'} className='btn me-2'>Profile</Link>
            {
              authResponse ?
              <>
                <Link to={'/orders'} className='btn me-2'>Orders</Link>
                <button className='btn me-2' onClick={handleLogout}>Logout</button>
              </>
              :
              <Link to={'/auth'} className='btn'>Sign-In</Link>
              }
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header