import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { userAuthContext } from '../contextApi/ContextApi';

function AdminHeader() {

  const nav = useNavigate()
  const {authResponse,setAuthResponse} = useContext(userAuthContext)

  const Logout = ()=>{
    nav('/')
    toast.success('Logged Out')
    setAuthResponse(false)
  }

  return (
    <>
         <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <i className="fa-solid fa-utensils fa-xl" style={{ color: "#4ba040" }} />{' '}
                        MealMap
                    </Navbar.Brand>
                    <button className='btn' onClick={Logout}><i className="fa-solid fa-arrow-right-from-bracket" style={{color: "#f71d1d",}} /></button>
                </Container>
            </Navbar>
    </>
  )
}

export default AdminHeader