import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import h1 from '../images/h1.jpg'
import { editHotel } from '../services/allApi';
import { useState, useContext, useEffect } from 'react';
import { editHotelContext } from '../contextApi/ContextApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Edithotel() {

    const [data, setData] = useState({
        name: "", place: "", username: "", email: "", password: "", image: "", type: ""
    })

    const { setEditHotelResponse, editHotelResponse } = useContext(editHotelContext)
    const nav = useNavigate()

    useEffect(() => {
        setData({
            name: editHotelResponse.name, place: editHotelResponse.place, username: editHotelResponse.username, email: editHotelResponse.email, password: editHotelResponse.password, image: editHotelResponse.image, type: editHotelResponse.type
        })
    }, [editHotelResponse])

    const handleEdit = async () => {
        const { name, place, username, email, password, image, type } = data

        if (!name || !place || !username || !email || !password) {
            toast.warning('Enter valid data')
        }
        else {
            console.log(data)

            if (image.type) {
                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }

                const fd = new FormData()
                fd.append('name',name)
                fd.append('place',place)
                fd.append('username',username)
                fd.append('email',email)
                fd.append('password',password)
                fd.append('image',image)
                fd.append('type',type)

                const res = await editHotel(editHotelResponse.id,fd,header)
                console.log(res)

                if(res.status==200){
                    toast.success('Hotel Updated')
                    nav('/ahome')
                    setData({
                        name: "", place: "", username: "", email: "", password: "", image: "", type: ""
                    })
                }
                else{
                    toast.error('Something went wrong')
                }
            }
            else{
                const header = {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }

                const res = await editHotel(editHotelResponse.id,data,header)
                console.log(res)

                if(res.status==200){
                    toast.success('Hotel Updated')
                    nav('/ahome')
                    setData({
                        name: "", place: "", username: "", email: "", password: "", image: "", type: ""
                    })
                }
                else{
                    toast.error('Something went wrong')
                }
            }
        }
    }

    return (
        <>
            <div className='container-fluid d-flex justify-content-center align-items-center' style={{
                backgroundImage: `url(${h1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
            }}>
                <div className='w-75 p-5'>
                    <h2 className='text-center mb-3 text-warning'>Edit Hotel</h2>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3 text-white"
                    >
                        <Form.Control type="name" placeholder="name@example.com" style={{ backgroundColor: 'black', color: 'white', border: '#e88223' }}
                            defaultValue={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Place" className="mb-3 text-white">
                        <Form.Control type="name" placeholder="Password" style={{ backgroundColor: 'black', border: '#e88223' }} className='text-white'
                            defaultValue={data.place} onChange={(e) => setData({ ...data, place: e.target.value })} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-3 text-white">
                        <Form.Control type="name" placeholder="Password" style={{ backgroundColor: 'black', border: '#e88223' }} className='text-white'
                            defaultValue={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Email" className="mb-3 text-white">
                        <Form.Control type="email" placeholder="Password" style={{ backgroundColor: 'black', color: 'white', border: '#e88223' }}
                            defaultValue={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 text-white">
                        <Form.Control type="password" placeholder="Password" style={{ backgroundColor: 'black', color: 'white', border: '#e88223' }}
                            defaultValue={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </FloatingLabel>
                    <label className='mb-3'>
                        <h6 className='text-white bg-black ' style={{ padding: '18px', borderRadius: '5px' }}>Image</h6>
                        <input type="file" style={{ display: 'none' }} onChange={(e) => setData({ ...data, image: e.target.files[0] })} />
                    </label>
                    <div className='d-grid gap-2 col-6 mx-auto'><button className='btn btn-warning ' onClick={handleEdit} >Update</button></div>
                </div>
            </div>
        </>
    )
}

export default Edithotel