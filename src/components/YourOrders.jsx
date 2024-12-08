import React from 'react'
import Header from './Header'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getOrdersForUsers,changeStatus } from '../services/allApi'
import baseUrl from '../services/baseurl'

function YourOrders() {

    const [orders, setOrders] = useState([])
    const [status,setStatus] = useState({
        status:"cancelled"
    })

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getOrdersForUsers(header)
        console.log(res)

        if (res.status == 200) {
            setOrders(res.data)
        }
    }

    const handleCancel = async(id,data)=>{
        const res = await changeStatus(id,data)
        console.log(res)

        if(res.status==200){
            getData()
        }
    } 

    return (
        <>
            <Header />
            <div className='container-fluid p-5'>
                <div><Link to={'/home'} className='btn' style={{ float: 'right' }}><i className="fa-solid fa-circle-arrow-left fa-xl" /></Link></div>
                {
                    orders.length > 0 ?
                        <>
                            {
                                orders.map(item => (
                                    <Row className='p-5'>
                                        <Col sm={12} md={4}>
                                            <img src={`${baseUrl}/uploads/${item.image}`} alt="" className='img-fluid' style={{height:'400px'}} />
                                        </Col>
                                        <Col sm={12} md={8}>
                                            <h3>{item.dishName}</h3>
                                            <hr />
                                            <p> Price: <i className="fa-solid fa-indian-rupee-sign me-1" />{' '}{item.price}</p>
                                            <p>Qty : {item.qty}</p>
                                            <p>Total Price : <i className="fa-solid fa-indian-rupee-sign me-1" />{" "}{item.tamount}</p>
                                            <p>Payment Status : {item.payment}</p>
                                            <p>Delivery Address : {item.house},{item.landmark},{item.city},{item.pin}</p>
                                            <p>Order Status : {item.status}</p>
                                            <button className='btn btn-primary' onClick={()=>{handleCancel(item._id,status)}}>Cancel Order</button>
                                        </Col>
                                    </Row>
                                ))
                            }
                        </>
                        :
                        <h1>No orders pending...</h1>
                }
            </div>
        </>
    )
}

export default YourOrders