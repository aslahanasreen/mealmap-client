import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Adddish from './Adddish';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addMenu } from '../services/allApi';
import { userAuthContext } from '../contextApi/ContextApi';


function Hotelheader() {

    const [menu, setMenu] = useState({
        image: ""
    })
    const [show, setShow] = useState(false);

    const nav = useNavigate()
    const { authResponse,setAuthResponse } = useContext(userAuthContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = async () => {
        nav('/')
        sessionStorage.clear()
        setAuthResponse(false)
    }

    const handleUpload = async() => {
        console.log(menu)
        const {image} = menu

        if( !image ){
            toast.warning('Enter Valid Input')
        }
        else{
            const header = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
              }

            const fd = new FormData()
            fd.append('image',image)

            console.log(header)

            const res = await addMenu(menu,header)
            console.log(res.response)

            if(res.status==200){
                toast.success('Menu Added')
                setMenu({
                    image:""
                })
                handleClose()
            }
            else{
                toast.error('Adding Failed')
            }
        }
    }

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Link to={'/hhome'} style={{ textDecoration: 'none' }} className='text-dark'>
                            <i className="fa-solid fa-utensils fa-xl" style={{ color: "#4ba040" }} />{' '}
                            MealMap
                        </Link>
                    </Navbar.Brand>
                    <div className='d-flex'>
                        <Nav className="ms-auto">
                            <NavDropdown title="Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">
                                    <button className='btn' onClick={handleShow}>Add Menu</button>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    <Link to={'/menu'} className='btn' > View Menu</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Adddish />
                        <Link to={'/hprofile'} className='btn mt-2'><i className="fa-solid fa-circle-user" /></Link>
                        <button className='btn' onClick={handleLogout}>Logout</button>
                    </div>
                </Container>
            </Navbar>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" className='form-control' onChange={(e) => setMenu({ ...menu, image: e.target.files[0] })} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpload}>Upload</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Hotelheader