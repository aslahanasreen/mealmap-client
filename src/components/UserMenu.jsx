import React from 'react'
import Header from './Header'
import { getMenuForUser } from '../services/allApi'
import baseUrl from '../services/baseurl'
import { useState, useEffect, useContext } from 'react'
import { hotelIdContext } from '../contextApi/ContextApi'

function UserMenu() {

    const [data, setData] = useState([])

    const { hotelIdResponse } = useContext(hotelIdContext)

    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        const hotelid = hotelIdResponse.hid
        const res = await getMenuForUser(hotelid)
        console.log(res)
        console.log(hotelIdResponse.hid)

        if (res.status == 200) {
            setData(res.data)
        }
    }

    return (
        <>
            <Header />
            <div className='container-fluid p-5'>
                {
                    data.length > 0 ?
                        <div className='p-5 row'>
                            <>
                                {
                                    data.map(item => (
                                        <div className='col-4'>
                                            <img src={`${baseUrl}/Uploads/${item.image}`} alt="" className='img-fluid' style={{height:'600px',width:'500px'}} />
                                        </div>))
                                }
                            </>
                        </div>
                        :
                        <h1>No menu available</h1>
                }
            </div >
        </>
    )
}

export default UserMenu