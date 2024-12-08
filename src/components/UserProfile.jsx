import React from 'react'
import Header from './Header'
import { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { userProfileUpdate, deactivateUser, orderhistory } from '../services/allApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UserProfile() {

  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setuser] = useState({
    email: "", username: ""
  })
  const [orders, setOrders] = useState([])

  const nav = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    const res = await orderhistory(header)
    console.log(res)

    if (res.status == 200) {
      setOrders(res.data)
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = async () => {
    console.log(user)
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    const res = await userProfileUpdate(user, header)
    console.log(res)

    if (res.status == 200) {
      toast.success('Updation Successful')
      nav('/auth')
      sessionStorage.clear()
      setuser({
        email: "", username: ""
      })
    }
    else {
      toast.error('Updation Failed')
    }
  }

  const handleDeactivate = async () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${sessionStorage.getItem('token')}`
    }

    const res = await deactivateUser(header)
    console.log(res)

    if (res.status == 200) {
      nav('/')
      toast.success('Account Deleted')
      sessionStorage.clear()
    }
    else {
      toast.error('Deletion Failed')
    }
  }

  return (
    <>
      <Header />
      <div className='container-fluid p-5' style={{ height: '90vh' }}>
        <div>
          {/* <div className='d-flex justify-content-center align-items-center mb-4'></div> */}
          <h3 className='text-center'><i className="fa-solid fa-circle-user me-2" size="2xl" />Personel Info</h3>
          <hr />
          <h6 className='text-center mt-4'>{sessionStorage.getItem('username')}</h6>
          <p className='text-center'>{sessionStorage.getItem('email')}</p>
          <div className='d-flex justify-content-center align-items-center'>
            <button className='btn' onClick={() => { setOpen(!open); setuser({ username: sessionStorage.getItem('username'), email: sessionStorage.getItem('email') }) }}
              aria-controls="example-collapse-text"
              aria-expanded={open}><i className="fa-solid fa-pen-to-square" /></button>
          </div>
          <Collapse in={open}>
            <div id="example-collapse-text">
              {/* <div className='d-grid col-6 d-flex justify-content-between'> */}
              <div className='row mt-3'>
                <div className='col-6'><input type="text" defaultValue={sessionStorage.getItem('username')}
                  className='form-control mb-3 me-3' placeholder='Name' onChange={(e) => setuser({ ...user, username: e.target.value })} /></div>
                <div className='col-6'> <input type="text" defaultValue={sessionStorage.getItem('email')}
                  className='form-control mb-3' placeholder='Email' onChange={(e) => setuser({ ...user, email: e.target.value })} /></div>
              </div>
              {/* </d/iv> */}
              <div className='d-grid col-6 mx-auto'>
                <button className='btn btn-success' onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </Collapse>
        </div>
        <div>
          <Row>
            <Col sm={12} md={6}>
              <div className='d-grid'>
                <button className='btn btn-dark mt-5' onClick={() => setOrder(!order)}
                  aria-controls="example-collapse-div1"
                  aria-expanded={order}>Order History</button>
              </div>
            </Col>
            <Col sm={12} md={6}>
              <div className='d-grid'>
                <button className='btn btn-dark mt-5' onClick={handleShow}>Deactivate Account</button>
              </div>
            </Col>
          </Row>

          <Collapse in={order}>
            <div id="example-collapse-div1" className='mt-5'>
              {
                orders.length > 0 ?
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {
                          orders.map((item,index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.dishName}</td>
                              <td>{item.status}</td>
                            </tr>
                          ))
                        }
                      </>
                    </tbody>
                  </table>
                  :
                  <h1>No orders yet..</h1>
              }
            </div>
          </Collapse>

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
        </div>
      </div>
    </>
  )
}

export default UserProfile