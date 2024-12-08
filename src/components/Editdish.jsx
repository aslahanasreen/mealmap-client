import React from 'react'
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editDish } from '../services/allApi';
import { toast } from 'react-toastify';
import { editDishContextApi } from '../contextApi/ContextApi';

function Editdish({ dish }) {

    const [show, setShow] = useState(false);
    const [editDishU, setEditDish] = useState({
        name: "", price: "", description: "", image: "", type: "", cuisine: "", category: ""
    })

    const { setEditDishResponse } = useContext(editDishContextApi)

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setEditDish({
            name: dish.name, price: dish.price, description: dish.description, image: dish.image, type: dish.type, cuisine: dish.cuisine, category: dish.category
        })
    }

    const handleUpdate = async () => {
        console.log(editDishU)

        const { name, price, description, image, type, cuisine, category } = editDishU

        if (editDishU.image.type) {
            const fd = new FormData()
            fd.append('name', name)
            fd.append('price', price)
            fd.append('description', description)
            fd.append('image', image)
            fd.append('type', type)
            fd.append('cuisine', cuisine)
            fd.append('category', category)

            const header = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }

            const res = await editDish(dish._id, fd, header)
            console.log(res)

            if (res.status == 200) {
                toast.success("Updation Successful")
                handleClose()
                setEditDish({
                    name: "", price: "", description: "", image: "", type: "", cuisine: "", category: ""
                })
                setEditDishResponse(res.data)
            }
            else {
                toast.error('Updation Failed')
            }
        }
        else {
            const header = {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }
            const res = await editDish(dish._id, editDishU,header)
            console.log(res)

            if (res.status == 200) {
                toast.success("Updation Successful")
                handleClose()
                setEditDish({
                    name: "", price: "", description: "", image: "", type: "", cuisine: "", category: ""
                })
                setEditDishResponse(res.data)
            }
            else {
                toast.error('Updation Failed')
            }
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <button className='btn' onClick={handleShow}> <i className="fa-solid fa-pen" style={{ color: "#74C0FC", }} /></button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Food Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" className='form-control mb-3' placeholder='Image'
                        onChange={(e) => setEditDish({ ...editDishU, image: e.target.files[0] })} />
                    <input type="text" className='form-control mb-3' placeholder='Name' defaultValue={editDishU.name}
                        onChange={(e) => setEditDish({ ...editDishU, name: e.target.value })} />
                    <input type="text" className='form-control mb-3' placeholder='Price' defaultValue={editDishU.price}
                        onChange={(e) => setEditDish({ ...editDishU, price: e.target.value })} />
                    <input type="text" className='form-control mb-3' placeholder='Category' defaultValue={editDishU.category}
                        onChange={(e) => setEditDish({ ...editDishU, category: e.target.value })} />
                    <input type="text" className='form-control mb-3' placeholder='Cuisine' defaultValue={editDishU.cuisine}
                        onChange={(e) => setEditDish({ ...editDishU, cuisine: e.target.value })} />
                    <input type="text" className='form-control mb-3' placeholder='Description' defaultValue={editDishU.description}
                        onChange={(e) => setEditDish({ ...editDishU, description: e.target.value })} />
                    <select name="" className='form-control' id="" defaultValue={editDishU.type}
                        onChange={(e) => setEditDish({ ...editDishU, type: e.target.value })}>
                        <option value="" selected disabled>Choose an Option</option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-vegetarian</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Editdish