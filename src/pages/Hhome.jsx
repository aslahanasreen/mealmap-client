import React from 'react'
import h2 from '../images/h2.jpg'
import { Row, Col } from 'react-bootstrap';
import Editdish from '../components/Editdish';
import Orders from '../components/Orders';
import Hotelheader from '../components/Hotelheader';
import { useState, useEffect,useContext } from 'react';
import { getDish,dltdish } from '../services/allApi';
import baseUrl from '../services/baseurl';
import { toast } from 'react-toastify';
import { addDishContext, editDishContextApi } from '../contextApi/ContextApi';

function Hhome() {

  const [dish, setDish] = useState([])

  const {addDishC} = useContext(addDishContext)
  const {editDishResponse} = useContext(editDishContextApi)

  useEffect(() => {
    getData()
  }, [addDishC,editDishResponse])

  const getData = async () => {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getDish(header)
    console.log(res)

    if (res.status == 200) {
      setDish(res.data)
    }
  }

  const handleDlt = async(id)=>{
    const res = await dltdish(id)
    console.log(res)

    if(res.status==200){
      toast.success("Deletion Successful")
      getData()
    }
    else{
      toast.error('Deletion Failed')
    }
  }

  return (
    <>

      <Hotelheader />
      <div className='container-fluid mb-5' style={{
        backgroundImage: `url(${h2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh'
      }}>
      </div>

      <div className='container-fluid mb-5'>
        <div>
          <h2 className='text-center mt-3'>Manage Food Items</h2>
          <hr />
          <Row>
            {
              dish.length > 0 ?
                <>
                  {
                    dish.map(item => (
                      <Col sm={12} md={4} className='p-5'>
                        <img src={`${baseUrl}/uploads/${item.image}`} alt="" className='img-fluid mb-2' style={{height:'500px'}} />
                        <div className='text-center'>
                          <h5>{item.type=="non-veg"?<i className="fa-regular fa-square-caret-up me-1" style={{color: "#ed1d27",}}/>:<i className="fa-regular fa-square-caret-down" style={{color: "#0ab80d",}} />}{'   '}{item.name}</h5>
                          <p><i className="fa-solid fa-indian-rupee-sign" /> {item.price}</p>
                          <p>{item.description}</p>
                          <div className='d-flex justify-content-center align-items-center'>
                            <Editdish dish={item}/>
                            <button className='btn'><i className="fa-solid fa-xmark ms-3" style={{ color: "#ff2934", }} onClick={()=>handleDlt(item._id)}/></button>
                          </div>
                        </div>
                      </Col>
                    ))
                  }
                </>
                :
                <h1>No dishes added yet</h1>
            }
          </Row>
        </div>
        <div>
          <h2 className='text-center'>Orders</h2>
          <hr />
          <Orders />
        </div>
      </div>
    </>
  )
}

export default Hhome