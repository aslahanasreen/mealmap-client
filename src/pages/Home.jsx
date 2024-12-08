import React from 'react'
import Header from '../components/Header'
import bg3 from '../images/bg3.jpg'
import 'animate.css';
import './home.css'
import Card from 'react-bootstrap/Card';
import Dishes from '../components/Dishes';
import { Link } from 'react-router-dom';
import { getHotels } from '../services/allApi';
import { useState, useEffect, useContext } from 'react';
import baseUrl from '../services/baseurl';
import { hotelIdContext } from '../contextApi/ContextApi';

function Home() {

    const [hotels, setHotels] = useState([])

    const {setHotelIdResponse} = useContext(hotelIdContext)

    useEffect(() => {
        getData()
    }, [])

    // const getLocation=()=>{
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const userLocation = {
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude
    //                 };
    //                 console.log(userLocation);
    //                 // Pass userLocation to your backend or filtering logic
    //             },
    //             (error) => console.error("Error getting location", error)
    //         );
    //     } else {
    //         console.error("Geolocation is not supported by this browser.");
    //     }        
    // }

    const getData = async () => {
        const res = await getHotels()
        console.log(res)

        if (res.status == 200) {
            setHotels(res.data)
        }
    }

    const handleId = (id)=>{
        setHotelIdResponse({hid:id})
    }

    return (
        <>
            <Header />

            <div className='container-fluid mb-5 d-flex justify-content-center align-items-center' style={{
                backgroundImage: `url(${bg3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
            }}>
                <div className=' w-75'>
                    <h3 className='animate__animated animate__backInUp text-white text-center dancing-script ' >Expect the Best</h3>
                    <p className='roboto-condensed text-white text-center animate__animated animate__backInUp'> MIRACLE ON YOUR PLATE</p>
                </div>
            </div>

            <div className='container-fluid'>
                {/* <div className='d-flex justify-content-center align-items-center my-5'>
                    <Link to={'/orders'} className='btn'><i className="fa-solid fa-money-bill-wheat fa-xl me-2" style={{ color: "#3cc845", }} />Your Orders</Link>
                </div> */}
                <h1 className='text-center '>HOTELS</h1>
                <hr />
                {/* <button className='btn btn-secondary' onClick={getLocation} style={{float:'right'}}>Filter By location</button> */}
                <div className='row my-5 d-flex justify-content-center'>
                    {
                        hotels.length > 0 ?
                            <>
                                {
                                    hotels.map(item => (
                                        <Card style={{ width: '18rem' }} className='col-sm-12 col-md-4 mx-5 mb-5'>
                                            <Card.Img variant="top" src={`${baseUrl}/Uploads/${item.image}`} style={{ height: '300px' }} />
                                            <Card.Body>
                                                <Card.Title className='text-center'>{item.name}</Card.Title>
                                                <Card.Text className='text-center'>
                                                    {item.place}
                                                </Card.Text>
                                                <div className='d-grid'>
                                                    <Link to={'/umenu'} className='btn btn-primary' onClick={()=>handleId(item._id)}>Menu</Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))
                                }
                            </>
                            :
                            <h1>No hotels available</h1>
                    }
                </div>
            </div>

            <Dishes />
        </>

    )
}

export default Home