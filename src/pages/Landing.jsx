import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import l1 from '../images/l1.jpg'
import l3 from '../images/l3.jpg'

function Landing() {
    return (
        <>
            <div>
                <div className='d-flex justify-content-center align-items-center' style={{ 
                    backgroundImage: `url(${l1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    height: '100vh' 
                    }}>
                    <div className='w-50 p-5' style={{ backgroundColor: '#FFFFFF80' }}>
                        <h1 className='text-center border border-5 border-white p-5 text-white'><b>Meal Map</b></h1>
                    </div>
                </div>
                
                <div className='container-fluid p-5 text-center'>
                    <h1>Meal Map</h1>
                    <hr />
                    <h5 className='text-warning'>Online Food Ordering and Delivery System</h5>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste inventore in dolorem voluptatum, reiciendis modi, perferendis consequatur 
                        explicabo distinctio ullam, minima placeat excepturi tempore aliquam vero facere at hic! Illo!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem dolor eius modi incidunt, 
                        repellat veniam voluptatibus voluptatum mollitia, fugiat, vero sit. Enim, at. Similique doloremque asperiores laborum, dolores commodi optio.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum distinctio quis molestiae nemo asperiores sunt voluptatum architecto nulla temporibus quos, 
                        laboriosam eos ut esse voluptate nostrum delectus suscipit molestias minus.</p>
                    <div className='d-grid col-6 mx-auto'>
                        <Link to={'/home'} className='btn btn-success mb-3'>Let's Explore</Link>
                        <Link to={'/auth'} className='btn btn-outline-primary'>Sign-in/Sign-up</Link>
                    </div>
                    {/* <hr /> */}
                </div>

                <div className='d-flex justify-content-center align-items-center' style={{ 
                    backgroundImage: `url(${l3})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    height: '60vh' 
                    }}>
                    
                </div>
                

                <div className='my-5 d-flex justify-content-around align-items-center'>
                    {/* <img src="https://img.freepik.com/free-vector/food-delivery-onboarding-screens_52683-39660.jpg?t=st=1730273378~exp=1730276978~hmac=ec4e60494574e540f9565d602d6ed7eba506aa23e214cae1baa9b6fb61589cf6&w=1800" */}
                    {/* alt="" className='img-fluid' style={{height:'700px',width:'100%'}}/> */}
                    <Card style={{ width: '20rem' }} className='shadow'>
                        <Card.Img variant="top" src="https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" style={{height:'300px'}}/>
                        <Card.Body>
                            <Card.Title className='text-center' style={{fontWeight:'bold'}}>FRESH FOOD</Card.Title>
                            <Card.Text>
                               <p style={{textAlign:'justify'}}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores officia excepturi natus recusandae expedita ratione, magni ipsa ipsum, voluptatum mollitia tempora voluptatem minima eum magnam id adipisci reiciendis aliquam totam?</p>
                            </Card.Text>
                            <div className='d-grid'><Button variant="dark">Next</Button></div>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem' }} className='shadow'>
                        <Card.Img variant="top" src="https://images.pexels.com/photos/9502199/pexels-photo-9502199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" style={{height:'300px'}}/>
                        <Card.Body>
                            <Card.Title className='text-center' style={{fontWeight:'bold'}}>FAST DELIVERY</Card.Title>
                            <Card.Text>
                               <p style={{textAlign:'justify'}}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores officia excepturi natus recusandae expedita ratione, magni ipsa ipsum, voluptatum mollitia tempora voluptatem minima eum magnam id adipisci reiciendis aliquam totam?</p>
                            </Card.Text>
                            <div className='d-grid'><Button variant="dark">Next</Button></div>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem' }} className='shadow'>
                        <Card.Img variant="top" src="https://images.pexels.com/photos/6252726/pexels-photo-6252726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" style={{height:'300px'}}/>
                        <Card.Body>
                            <Card.Title className='text-center' style={{fontWeight:'bold'}}>ENJOY TODAY</Card.Title>
                            <Card.Text>
                               <p style={{textAlign:'justify'}}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores officia excepturi natus recusandae expedita ratione, magni ipsa ipsum, voluptatum mollitia tempora voluptatem minima eum magnam id adipisci reiciendis aliquam totam?</p>
                            </Card.Text>
                            <div className='d-grid'><Button variant="dark">Next</Button></div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Landing