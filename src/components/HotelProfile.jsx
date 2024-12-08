import React from 'react'
import Hotelheader from './Hotelheader'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import baseUrl from '../services/baseurl';
import { hotelProfileUpdate, changePassword, deactivateHotel } from '../services/allApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function HotelProfile() {

  const [open, setOpen] = useState(false);
  const [openP, setOpenP] = useState(false)
  const [show, setShow] = useState(false);
  const [hotel, setHotel] = useState({
    email: "", username: "", name: "", place: "", image: ""
  })
  const [pass, setPass] = useState({
    password: "", conPass: ""
  })

  const nav = useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeactivate = () => {

  }

  const handleUpdate = async () => {
    console.log(hotel)
    const { email, username, name, place, image } = hotel

    if (hotel.image.type) {
      const fd = new FormData()
      fd.append("name", name)
      fd.append("email", email)
      fd.append("username", username)
      fd.append("place", place)
      fd.append("image", image)

      const header = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Token ${sessionStorage.getItem('token')}`
      }

      const res = await hotelProfileUpdate(fd, header)
      console.log(res)
      if (res.status == 200) {
        toast.success('Profile Updated')
        nav('/auth')
        setHotel({
          email: "", username: "", name: "", place: "", image: ""
        })
        sessionStorage.clear()
      }
      else {
        toast.error('Updation Failed')
      }
    }
    else {
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem('token')}`
      }

      const res = await hotelProfileUpdate(hotel, header)
      console.log(res)

      if (res.status == 200) {
        toast.success('Profile Updated')
        nav('/auth')
        setHotel({
          email: "", username: "", name: "", place: "", image: ""
        })
        sessionStorage.clear()
      }
      else {
        toast.error('Updation Failed')
      }
    }
  }

  const handlePass = async () => {
    console.log(pass)
    const { password, conPass } = pass

    if (!password || !conPass) {
      toast.warning('Enter Valid Data ')
    }
    else {
      if (password == conPass) {
        const header = {
          "Content-Type": "application/json",
          "Authorization": `Token ${sessionStorage.getItem('token')}`
        }

        const res = await changePassword(pass, header)
        console.log(res)

        if (res.status == 200) {
          nav('/auth')
          toast.success('Password Changed')
          setPass({
            password: "", conPass: ""
          })
          sessionStorage.clear()
        }
        else {
          toast.error('Updation Failed')
        }
      }
      else {
        toast.warning('Password not Matching')
      }
    }
  }

  const handleDelete = async() => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    const res = await deactivateHotel(header)
    console.log(res)

    if(res.status == 200){
      toast.success('Account Deleted')
      sessionStorage.clear()
      nav('/')
    }
  }

  return (
    <>
      <Hotelheader />
      <div className='container-fluid p-5'>
        <div>
          <h3 className='text-center'><i className="fa-solid fa-hotel me-2" />Hotel Info</h3>
          <hr />

          <div className='row'>
            <div className='col-md-4 col-sm-12'>
              <img src={`${baseUrl}/uploads/${sessionStorage.getItem('image')}`}
                alt="" className='img-fluid' style={{ height: '400px', borderRadius: '50%' }} />
            </div>
            <div className='col-md-8 col-sm-12 d-flex justify-content-center align-items-center'>
              <div className='w-100'>
                <h4>{sessionStorage.getItem('name')}</h4>
                <hr />
                <p>{sessionStorage.getItem('email')}</p>
                <p>{sessionStorage.getItem('place')}</p>

                <div className='d-flex mb-3'>
                  <div className='col-6'>
                    <div className='d-grid'><button className='btn btn-outline-success me-3' onClick={() => {
                      setOpen(!open);
                      setHotel({
                        name: sessionStorage.getItem('name'), email: sessionStorage.getItem('email'), username: sessionStorage.getItem('username'), place: sessionStorage.getItem('place'), image: sessionStorage.getItem('image')
                      })
                    }}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}>Edit Profile</button></div>
                  </div>
                  <div className='col-6'>
                    <div className='d-grid'><button className='btn btn-outline-warning' onClick={() => setOpenP(!openP)}
                      aria-controls="example-collapse-text2"
                      aria-expanded={openP}>Change Password</button></div>
                  </div>
                </div>

                <div className='d-grid'>
                  <button className='btn btn-outline-primary' onClick={() => { handleShow; handleDelete }}>Deactivate Account</button>
                </div>
                <Collapse in={open}>
                  <div id="example-collapse-text" className='mt-4'>
                    <div className='d-grid col-md-12 d-flex'>
                      <input type="text" placeholder='Name' defaultValue={sessionStorage.getItem('name')} className='form-control mb-3 me-3' onChange={(e) => { setHotel({ ...hotel, name: e.target.value }) }} />
                      <input type="text" placeholder='Place' defaultValue={sessionStorage.getItem('place')} className='form-control mb-3' onChange={(e) => { setHotel({ ...hotel, place: e.target.value }) }} />
                    </div>
                    <input type="text" placeholder='Email' defaultValue={sessionStorage.getItem('email')} className='form-control mb-3' onChange={(e) => { setHotel({ ...hotel, email: e.target.value }) }} />
                    <div className='d-grid col-md-12 d-flex'>
                      <input type="text" placeholder='Username' defaultValue={sessionStorage.getItem('username')} className='form-control mb-3 me-3' onChange={(e) => { setHotel({ ...hotel, username: e.target.value }) }} />
                      <input type="file" placeholder='Image' className='form-control mb-3' onChange={(e) => { setHotel({ ...hotel, image: e.target.files[0] }) }} />
                    </div >
                    <div className='d-grid mx-auto col-4'><button className='btn btn-outline-primary' onClick={handleUpdate}>Update</button></div>
                  </div>
                </Collapse>

                <Collapse in={openP}>
                  <div id="example-collapse-text2" className='mt-4'>
                    <input type="password" placeholder='New Password' className='form-control mb-3' onChange={(e) => setPass({ ...pass, password: e.target.value })} />
                    <input type="password" placeholder='Confirm Password' className='form-control mb-3' onChange={(e) => setPass({ ...pass, conPass: e.target.value })} />
                    <div className='d-grid mx-auto col-4'><button className='btn btn-outline-primary' onClick={handlePass}>Save</button></div>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <p className='text-center'>
            Are sure to deactivate your account?<br /><br />
            <i className="fa-solid fa-circle-exclamation me-2" style={{ color: "#ffac38", }} />
            This means you will lose this account.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeactivate}>yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default HotelProfile