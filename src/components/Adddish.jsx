import React from 'react'
import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addDish } from '../services/allApi';
import { toast } from 'react-toastify';
import { addDishContext } from '../contextApi/ContextApi';

function Adddish() {

    const [show, setShow] = useState(false);
    const [dish, setDish] = useState({
        image: "", name: "", type: "", category: "", price: "", cuisine: "",description:""
    })

    const { setAddDishC } = useContext(addDishContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = async () => {
        console.log(dish)
        const { image, name, type, category, price, cuisine, description } = dish

        if (!image || !name || !type || !category || !price || !cuisine || !description)  {
            toast.warning('Enter valid data')
        }
        else {
            const header = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }

            const fd = new FormData()
            fd.append('name', name)
            fd.append('image', image)
            fd.append('type', type)
            fd.append('category', category)
            fd.append('price', price)
            fd.append('cuisine', cuisine)
            fd.append('description',description)

            const res = await addDish(fd, header)
            console.log(res)

            if (res.status == 200) {
                toast.success('Dish Added')
                handleClose()
                setDish({
                    image: "", name: "", type: "", category: "", price: "", cuisine: "",description:""
                })
                setAddDishC(res.data)
            }
            else{
                toast.error('Addition Failed')
            }
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <button className='btn' onClick={handleShow}><i className="fa-solid fa-bowl-food" /></button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Food Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" className='form-control mb-3' placeholder='Image' onChange={(e) => setDish({ ...dish, image: e.target.files[0] })} />
                    <input type="text" className='form-control mb-3' placeholder='Name' onChange={(e) => setDish({ ...dish, name: e.target.value })} />
                    <input type="text" className='form-control mb-3' placeholder='Price' onChange={(e) => setDish({ ...dish, price: e.target.value })} />
                    <input type="text" className='form-control mb-3' placeholder='Category' onChange={(e) => setDish({ ...dish, category: e.target.value })} />
                    <input type="text" className='form-control mb-3' placeholder='Cuisine' onChange={(e) => setDish({ ...dish, cuisine: e.target.value })} />
                    <input type="text" className='form-control mb-3' placeholder='Description' onChange={(e) => setDish({ ...dish, description: e.target.value })} />
                    <select name="" className='form-control' id="" onChange={(e) => setDish({ ...dish, type: e.target.value })}>
                        <option value="" selected disabled>Choose an Option</option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-vegetarian</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Adddish