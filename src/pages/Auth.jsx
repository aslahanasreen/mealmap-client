import React, { useState,useContext } from 'react'
import bg1 from '../images/bg1.jpg'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { regUser, userLogin } from '../services/allApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userAuthContext } from '../contextApi/ContextApi';

function Auth() {

    const [authStatus, setAuthStatus] = useState(false)
    const [user, setUser] = useState({
        email: "", username: "", password: "", type: "user"
    })

    const {setAuthResponse} = useContext(userAuthContext)

    const nav = useNavigate()

    const handleAuthStatus = () => {
        setAuthStatus(!authStatus)
    }

    const handleReg = async () => {
        console.log(user)
        const res = await regUser(user)
        console.log(res)

        if (res.status == 200) {
            toast.success('Registration Successful')
            handleAuthStatus()
            setUser({
                email: "", username: "", password: "", type: "user"
            })
        }
        else {
            toast.error('Registration failed!')
        }
    }

    const handleLogin = async () => {
        console.log(user)
        const res = await userLogin(user)
        console.log(res)

        if (res.status == 200) {
            toast.success('Login Successful')
            if (res.data.type == 'user') {
                nav('/home')
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('username', res.data.username)
                sessionStorage.setItem('email', res.data.email)
                setAuthResponse(true)
            }
            else if (res.data.type == 'hotel') {
                nav('/hhome')
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('username', res.data.username)
                sessionStorage.setItem('email', res.data.email)
                sessionStorage.setItem('pass',res.data.password)
                sessionStorage.setItem('name',res.data.name)
                sessionStorage.setItem('place',res.data.place)
                sessionStorage.setItem('image',res.data.image)
                setAuthResponse(true)
            }
            else {
                nav('/ahome')
                setAuthResponse(true)
            }
            setUser({
                email: "", username: "", password: "", type: "user"
            })
        }
        else {
            toast.error('Login Failed')
        }
    }

    return (
        <>
            <div className='container-fluid ' style={{
                backgroundImage: `url(${bg1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
            }}>
                <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
                    <div className='w-50 p-5' style={{ backgroundColor: '#FFFFFF80' }}>
                        {
                            !authStatus ?
                                <h2 className='text-center mt-3'>LOGIN</h2>
                                :
                                <h2 className='text-center mt-3'>REGISTRATION</h2>
                        }
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </FloatingLabel>
                        {
                            authStatus &&
                            <FloatingLabel controlId="floatingPassword" label="username" className="mb-3">
                                <Form.Control type="username" placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                            </FloatingLabel>
                        }
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </FloatingLabel>

                        {
                            !authStatus ?
                                <div className='d-grid'>
                                    <button className='btn mt-3 text-white' onClick={handleLogin} style={{ backgroundColor: '#eb9a38' }}>Login</button>
                                    <button className='btn mt-3' onClick={handleAuthStatus}>Not a User?</button>
                                </div>
                                :
                                <div className='d-grid'>
                                    <button className='btn mt-3' onClick={handleReg} style={{ backgroundColor: '#eb9a38' }}>Register</button>
                                    <button className='btn mt-3' onClick={handleAuthStatus}>Already a User?</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth