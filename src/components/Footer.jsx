import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
        <div className='container-fluid p-5 bg-success text-white'>
            <Row>
                <Col sm={12} md={5}>
                    <h3>About</h3>
                    <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, qui. Consectetur, voluptatibus repudiandae ratione illum nobis, unde, nemo odio nostrum nihil necessitatibus et neque doloribus dolorum qui eum in officiis.</p>
                </Col>
                <Col sm={12} md={2}>
                    <h3>Links</h3>
                    <div className='d-flex flex-column'>
                        <Link to={'/'} className='text-white'>Landing</Link>
                        <Link to={'/auth'} className='text-white'>Login</Link>
                    </div>
                </Col>
                <Col sm={12} md={5}>
                    <h3>Feedback</h3>
                    <input type="text" className='form-control mb-3'/>
                    <button className='btn btn-info'>SEND</button>
                </Col>
            </Row>
        </div>
    </>
  )
}

export default Footer