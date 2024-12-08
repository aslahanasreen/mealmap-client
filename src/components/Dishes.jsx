import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { userAuthContext,dishDetailsContext } from '../contextApi/ContextApi';
import { getDishForUsers,getHotelName } from '../services/allApi';
import baseUrl from '../services/baseurl';

function Dishes() {

    const [show, setShow] = useState(false);
    const [dishes, setDishes] = useState([])
    const [dishDetails,setDishDetails] = useState({
        name:"",price:"",description:"",cuisine:"",image:"",type:"",category:"",hid:"",hname:"",hplace:""
    })
    const [searchKey,setSearchKey] = useState("")

    const { authResponse, setAuthResponse } = useContext(userAuthContext)
    const {setDishResponse} = useContext(dishDetailsContext)

    useEffect(() => {
        getData()
    }, [])


    const handleClose = () => {
        setShow(false);
        setDishDetails({
            name:"",price:"",description:"",cuisine:"",image:"",type:"",category:"",hid:"" 
        })
    }
    const handleShow = async(data) => {
        setShow(true);
        setDishDetails({
            name:data.name,price:data.price,description:data.description,cuisine:data.cuisine,image:data.image,type:data.type,category:data.category,hid:data.hotelid,hname:data.hotelDetails.name,hplace:data.hotelDetails.place
        })
        setDishResponse({
            name:data.name,price:data.price,description:data.description,cuisine:data.cuisine,image:data.image,type:data.type,category:data.category,hid:data.hotelid,hname:data.hotelDetails.name,hplace:data.hotelDetails.place
        })
        console.log(dishDetails)
    }

    const getData = async () => {
        const res = await getDishForUsers(searchKey)
        console.log(res)
        console.log(authResponse)

        if (res.status == 200) {
            setDishes(res.data)
        }
    }

    return (
        <>
            <div className='container-fluid'>
                <h1 className='text-center'>DISHES</h1>
                <hr />
                <div className='d-flex justify-content-center align-items-center my-5'>
                    <div className='d-flex w-50'>
                        <input type="text" className='form-control me-2' placeholder='Search' onChange={(e)=>setSearchKey(e.target.value)}/>
                        <button className='btn btn-outline-primary'onClick={getData}>Search</button>
                    </div>
                </div>

                <div className='mb-5 p-5'>
                    {
                        dishes.length > 0 ?
                            <Row>
                                <>
                                    {
                                        dishes.map(item => (
                                            <Col sm={12} md={3} className='mb-5' >
                                               <div className='d-flex flex-column justify-content-center align-items-center'>
                                                    <img src={`${baseUrl}/Uploads/${item.image}`}
                                                        alt="" className='img-fluid shadow' style={{ borderRadius: '50%',height:'200px', width:'200px' }} />
                                               </div>
                                                <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
                                                    <h3>{item.name}</h3>
                                                    <p><i className="fa-solid fa-indian-rupee-sign" />{' '}{item.price}</p>
                                                    <button className='btn btn-primary' onClick={()=>handleShow(item)}>Details</button>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </>
                            </Row>
                            :
                            <h1>No items available yet..</h1>
                    }
                </div>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Dish Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>{dishDetails.description}</h6>
                    <hr />
                    <p>{dishDetails.hname},{dishDetails.hplace}</p>
                        <hr />
                        <p>
                        {dishDetails.type=="non-veg"?<i className="fa-regular fa-square-caret-up me-1" style={{color: "#ed1d27",}}/>:<i className="fa-regular fa-square-caret-down" style={{color: "#0ab80d",}} />}{' '}{dishDetails.type} <br />
                        {dishDetails.cuisine} <br />
                        {dishDetails.category}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        authResponse ?
                            <Link to={'/pay'} className='btn btn-primary'>Place Order</Link>
                            :
                            <Link to={'/auth'} className='btn btn-primary'>SignIn</Link>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Dishes