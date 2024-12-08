import { useState,useContext } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './pages/Landing'
import './bootstrap.min.css'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import AHome from './pages/AHome'
import Home from './pages/Home'
import Addhotel from './components/Addhotel'
import Edithotel from './components/Edithotel'
import Hhome from './pages/Hhome'
import YourOrders from './components/YourOrders'
import UserProfile from './components/UserProfile'
import HotelProfile from './components/HotelProfile'
import Menu from './components/Menu'
import Payment from './components/Payment'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserMenu from './components/UserMenu'
import { userAuthContext } from './contextApi/ContextApi'
import ScrollToTop from './components/ScrollToTop'

function App() {

  const { authResponse,setAuthResponse } = useContext(userAuthContext)

  return (
    <>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/ahome' element={authResponse?<AHome/>:<Auth/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/addh' element={authResponse?<Addhotel/>:<Auth/>}/>
        <Route path='/edith' element={authResponse?<Edithotel/>:<Auth/>} />
        <Route path='/hhome' element={authResponse?<Hhome/>:<Auth/>} />
        <Route path='/orders' element={authResponse?<YourOrders/>:<Auth/>} />
        <Route path='/uprofile' element={authResponse?<UserProfile/>:<Auth/>} />
        <Route path='/hprofile' element={authResponse?<HotelProfile/>:<Auth/>} />
        <Route path='/menu' element={authResponse?<Menu/>:<Auth/>} />
        <Route path='/pay' element={authResponse?<Payment/>:<Auth/>} />
        <Route path='/umenu' element={authResponse?<UserMenu/>:<Auth/>} />
      </Routes>
      <Footer/>
      <ToastContainer />
    </>
  )
}

export default App
