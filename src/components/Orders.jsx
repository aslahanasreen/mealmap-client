import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { getOrdersForHotel,changeStatus } from '../services/allApi';
import baseUrl from '../services/baseurl';
import { toast } from 'react-toastify';

function Orders() {

    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState([])
    const [sstatus,setStatus] = useState({
        status:""
    })
    const [ID,setID] = useState("")

    useEffect(() => {
        getData()
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = (data,id) => {
        setShow(true)
        setStatus({
            status:data
        })
        setID(id)
    };

    const getData = async () => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Token ${sessionStorage.getItem('token')}`
        }

        const res = await getOrdersForHotel(header)
        console.log(res)

        if (res.status == 200) {
            setOrders(res.data)
        }
    }

    const handleStatus = async(id,data)=>{
        console.log(sstatus)
        const res = await changeStatus(id,data)
        console.log(res)

        if(res.status==200){
            toast.success('Status Changed')
            handleClose()
            getData()
        }
        else{
            toast.error('Something went wrong')
        }
    }

    return (
        <>
            <div className='p-5'>
                {
                    orders.length > 0 ?
                        <div className='row d-flex justify-content-evenly align-items-center'>
                            <>
                                {
                                    orders.map(item => (
                                        <Card style={{ width: '18rem' }} className='col-4 me-5 mb-5'>
                                            <Card.Img variant="top" src={`${baseUrl}/uploads/${item.image}`}
                                                className='img-fluid' style={{ height: '350px' }} />
                                            <Card.Body>
                                                <Card.Title className='text-center'>{item.dishName}</Card.Title>
                                                <Card.Text>
                                                    <div>
                                                        <hr />
                                                        <p>Qty : {item.qty}</p>
                                                        <p>Price : <i className="fa-solid fa-indian-rupee-sign" />{item.price}</p>
                                                        <p>Total amount paid : <i className="fa-solid fa-indian-rupee-sign" />{item.tamount}</p>
                                                        <p>Address : {item.house},{item.landmark},{item.city},{item.pin}</p>
                                                    </div>
                                                </Card.Text>
                                                <div className='d-grid'><Button variant="primary" onClick={()=>handleShow(item.status,item._id)}>Status</Button></div>
                                            </Card.Body>
                                        </Card>
                                    ))
                                }
                            </>
                        </div>
                        :
                        <h1>No orders made yet..</h1>
                }
            </div>



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Order Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> Status : {sstatus.status}.</p>
                    <Form.Select aria-label="Default select example" onChange={(e)=>setStatus({status:e.target.value})}>
                        <option>Change Status</option>
                        <option value="packed">Packed</option>
                        <option value="on the way">On the way</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancel</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>handleStatus(ID,sstatus)}>Change Status</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Orders