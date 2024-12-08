import React from 'react'
import { useState, useEffect } from 'react'
import { viewMenu, deleteMenu } from '../services/allApi'
import baseUrl from '../services/baseurl'
import { toast } from 'react-toastify'
import Hotelheader from './Hotelheader'

function Menu() {

    const [menu, setMenu] = useState([])


    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Token ${sessionStorage.getItem('token')}`
        }

        const res = await viewMenu(header)
        console.log(res)
        // console.log(type.name)

        if (res.status == 200) {
            setMenu(res.data)
        }
    }

    const handleDelete = async (id) => {
        const res = await deleteMenu(id)
        console.log(res)

        if (res.status == 200) {
            toast.success("Menu Deleted")
            getData()
        }
        else {
            toast.error('Deletion Failed')
        }
    }

    return (
        <>

            <Hotelheader />

            <div className="container-fluid p-5">
                {
                    menu.length > 0 ?
                        <>
                            <div>
                                {
                                    menu.map(item => (
                                        <div className="p-5 d-flex flex-column justify-content-center align-items-center">
                                            <img src={`${baseUrl}/Uploads/${item.image}`}
                                                alt="" className='img-fluid' style={{ width: '700px' }} />
                                            <button className='btn' onClick={() => handleDelete(item._id)}><i className="fa-solid fa-trash fa-xl" style={{ color: "#f9242f", }} /></button>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                        :
                        <h1>No menu added yet..!</h1>
                }
                {/* <div className="p-5 d-flex justify-content-center align-items-center">
                    <img src="https://content.jdmagicbox.com/comp/kozhikode/y7/0495px495.x495.221120005759.z2y7/catalogue/yummy-fried-chicken-nadapuram-kozhikode-fried-chicken-restaurants-9xaj5zrani.jpg" alt="" className='img-fluid' />
                </div> */}
            </div>
        </>
    )
}

export default Menu