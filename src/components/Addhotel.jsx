import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import h1 from '../images/h1.jpg'
import { addHotel } from '../services/allApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Addhotel() {

    const [data, setdata] = useState({
        name: "", place: "", username: "", email: "", password: "", image: "",type:"hotel"
    })

    const nav = useNavigate()

    const handleUpload = async () => {
        const { name, place, username, email, password, image,type } = data

        if (!name || !place || !username || !email || !password || !image) {
            toast.warning('Enter valid data')
        }
        else {
            console.log(data)
            const header = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }

            const fd = new FormData()
            fd.append('name',name)
            fd.append('place',place)
            fd.append('email',email)
            fd.append('username',username)
            fd.append('password',password)
            fd.append('image',image)
            fd.append('type',type)

            const res = await addHotel(fd,header)
            console.log(res)

            if(res.status==200){
                toast.success('Hotel Added')
                nav('/ahome')
                setdata({
                    name: "", place: "", username: "", email: "", password: "", image: "",type:"hotel"   
                })
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
                    <h2 className='text-center mb-3 text-warning'>Add Hotel</h2>


                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3 text-white"
                    >
                        <Form.Control type="name" placeholder="name@example.com" style={{ backgroundColor: 'black', color: 'white', border: '#e88223' }}
                            onChange={(e) => setdata({ ...data, name: e.target.value })} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Place" className="mb-3 text-white">
                        <Form.Control type="name" placeholder="Password" style={{ backgroundColor: 'black', border: '#e88223' }}
                            className='text-white' onChange={(e) => setdata({ ...data, place: e.target.value })} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Username" className="mb-3 text-white">
                        <Form.Control type="name" placeholder="Password" style={{ backgroundColor: 'black', border: '#e88223' }}
                            className='text-white' onChange={(e) => setdata({ ...data, username: e.target.value })} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Email" className="mb-3 text-white">
                        <Form.Control type="email" placeholder="Password" style={{ backgroundColor: 'black', color: 'white', border: '#e88223' }}
                            onChange={(e) => setdata({ ...data, email: e.target.value })} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 text-white">
                        <Form.Control type="password" placeholder="Password" style={{ backgroundColor: 'black', color: 'white', border: '#e88223' }}
                            onChange={(e) => setdata({ ...data, password: e.target.value })} />
                    </FloatingLabel>
                    <label className='mb-3'>
                        <h6 className='text-white bg-black ' style={{ padding: '18px ', borderRadius: '5px' }}>Image</h6>
                        <input type="file" style={{ display: 'none' }} onChange={(e) => setdata({ ...data, image: e.target.files[0] })} />
                    </label>
                    <div className='d-grid gap-2 col-6 mx-auto'><button className='btn btn-warning ' onClick={handleUpload}>Submit</button></div>
                </div>
            </div>
        </>
    )
}

export default Addhotel