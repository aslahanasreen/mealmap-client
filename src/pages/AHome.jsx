import React from 'react'
import bg4 from '../images/bg4.jpg'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import { getUsers, dltUser, getHotels, dltHotel } from '../services/allApi'
import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { editHotelContext } from '../contextApi/ContextApi'

function AHome() {

    const [users, setUsers] = useState([])
    const [data, setData] = useState([])

    const {setEditHotelResponse,editHotelResponse} = useContext(editHotelContext)

    useEffect(() => {
        getData()
        getHData()
    }, [])

    const getData = async () => {
        const res = await getUsers()
        console.log(res)

        if (res.status == 200) {
            setUsers(res.data)
        }
    }

    const getHData = async () => {
        const res = await getHotels()
        console.log(res)

        if (res.status == 200) {
            setData(res.data)
        }
    }

    const handleDeleteUser = async (id) => {
        const res = await dltUser(id)
        console.log(res)

        if (res.status == 200) {
            getData()
            toast.success('User Deleted')
        }
        else {
            toast.error('Dletion Failed')
        }
    }

    const handleEdit= (data)=>{
        setEditHotelResponse({
            id:data._id,name:data.name,place:data.place,email:data.email,username:data.username,password:data.password,image:data.image,type:data.type
        })
        // console.log(editHotelResponse)
    }

    const handleDltHotel = async(id)=>{
        const res = await dltHotel(id)
        console.log(res)

        if(res.status==200){
            toast.success('Hotel Deleted')
            getHData()
        }
        else{
            toast.error('Something went wrong')
        }
    }

    return (
        <>
            <AdminHeader />
            <div className='container-fluid p-5 mb-5' style={{
                backgroundImage: `url(${bg4})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '80vh'
            }}>
            </div>

            <div className='container-fluid p-5'>
                <div className='mb-5'>
                    <h2 className='text-center mb-4 '>User Management</h2>
                    {
                        users.length > 0 ?
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        {/* <th>User type</th> */}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                {/* <td>User</td> */}
                                                <td>
                                                    {/* <button className='btn'><i className="fa-solid fa-circle-check fa-xl" style={{color: "#37d752",}} /></button> */}
                                                    <button className='btn' onClick={() => handleDeleteUser(item._id)}><i className="fa-solid fa-circle-xmark fa-xl" style={{ color: "#ef0b2d", }} /></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            :
                            <h1>No users available</h1>
                    }
                </div>

                <div>
                    <h2 className='text-center mb-3 '>Hotel Management</h2>
                    <div className='d-grid mb-5'><Link to={'/addh'} className='btn btn-outline-success mt-4'>Add Hotel</Link></div>
                    {
                        data.length > 0 ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Place</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => (
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.place}</td>
                                                <td>
                                                    <Link to={'/edith'} onClick={()=>handleEdit(item)}><i className="fa-solid fa-square-pen" style={{ color: "#74C0FC", }} /></Link>
                                                    <button className='btn ms-3 mb-1' onClick={()=>handleDltHotel(item._id)}><i className="fa-solid fa-square-minus" style={{ color: "#ee2020", }} /></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            :
                            <h1>No hotels added yet</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default AHome