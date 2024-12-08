import React from 'react'
import Header from './Header'
import { Row, Col } from 'react-bootstrap'
import baseUrl from '../services/baseurl'
import { useContext, useState, useEffect } from 'react'
import { dishDetailsContext } from '../contextApi/ContextApi'
import { toast } from 'react-toastify'
import { addOrder, razorPayment, validatePayment } from '../services/allApi'
import { json, useNavigate } from 'react-router-dom'

function Payment() {

    const [paymentt, setPayment] = useState({
        dishName: "", qty: "1", price: "", tamount: "", name: "", house: "", landmark: "", city: "", pin: "", mob: "", payment: "", status: "", hotelid: "", image: ""
    })
    const [selectedValue, setSelectedValue] = useState('');
    const [razor, setrazor] = useState({
        amount: "", currency: "INR", receipt: ""
    })
    var order = {}
    // const [orderdata, setData] = useState("")

    const { dishResponse } = useContext(dishDetailsContext)
    const nav = useNavigate()
    // console.log(dishResponse)

    useEffect(() => {
        if (dishResponse?.price) {
            setPayment((prev) => ({
                ...prev,
                price: dishResponse.price.toString(),
                tamount: dishResponse.price,
                dishName: dishResponse.name,
                hotelid: dishResponse.hid,
                image: dishResponse.image,
                payment: "Completed",
                status: "Order Placed"
            }));
            const total = parseFloat(dishResponse.price || 0)*100
            setrazor({
                amount: JSON.stringify(total), currency: "INR", receipt: "qwas1"
            })
        }
    }, [dishResponse]);

    useEffect(() => {
        // if(payment.tamount==""){
        //     setPayment({
        //         ...payment,tamount:dishResponse.price
        //     })
        // }
        // else{
        if (paymentt.qty && paymentt.price) {
            const total = parseInt(paymentt.qty, 10) * parseFloat(paymentt.price || 0);
            setPayment((prev) => ({
                ...prev,
                tamount: total.toString(), // Ensure tamount is a string
            }));
            const inr = total*100
            setrazor((prev) => ({
                ...prev,
                amount: inr.toString()
            }))
        }
        // }
    }, [paymentt.qty])

    const handleOnSave = () => {
        toast.success('Address Saved')
        console.log(paymentt)
    }

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handlePay = async () => {

        const { dishName, qty, price, tamount, name, house, landmark, city, pin, mob, payment, status, hotelid, image } = paymentt

        if (!dishName || !qty || !price || !tamount || !name || !house || !landmark || !city || !pin || !mob || !payment || !status || !hotelid || !image || selectedValue == "") {
            toast.warning('Valid Data missing!')
        }
        else {
            console.log(paymentt)

            const file = await convertFilePathToFile(image);

            const header = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }

            const fd = new FormData()
            fd.append('dishName', dishName)
            fd.append('qty', qty)
            fd.append('price', price)
            fd.append('tamount', tamount)
            fd.append('name', name)
            fd.append('house', house)
            fd.append('landmark', landmark)
            fd.append('city', city)
            fd.append('pin', pin)
            fd.append('mob', mob)
            fd.append('payment', payment)
            fd.append('status', status)
            fd.append('hotelid', hotelid)
            fd.append('image', file)

            const res = await addOrder(fd, header)
            if (res.status == 200) {
                toast.success("OrderSuccessful")
                setPayment({
                    dishName: "", qty: "1", price: "", tamount: "", name: "", house: "", landmark: "", city: "", pin: "", mob: "", payment: "", status: "", hotelid: "", image: ""
                })
                nav('/home')
            }
            else {
                toast.error('order Failed')
            }
        }
    }

    async function convertFilePathToFile(fileName) {
        const response = await fetch(`${baseUrl}/Uploads/${fileName}`);
        const blob = await response.blob(); // Convert the response to a Blob
        const file = new File([blob], fileName, { type: blob.type }); // Create a File object
        return file;
    }

    const handleRazorpay = async (e) => {

        const res = await razorPayment(razor)
        order = res.data
        // setData(res.data)
        console.log(order)
        console.log(res)
        console.log(razor)
        // console.log(orderdata)
        // console.log(res)
        // if (res.status == 200) {
        //     setData(res.data)
        //     console.log(data)
        // }
        // else {
        //     toast.error('Payment Failed')
        // }
        // console.log(order)
        // console.log(order.order.id)

        var options = {
            "key": "rzp_test_xKiFUv5lACK3JH", // Enter the Key ID generated from the Dashboard
            "amount": razor.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": razor.currency,
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response) {
                const body = {
                    ...response
                }

                const valRes = await validatePayment(JSON.stringify(body))
                console.log(valRes)

                handlePay()

                // if (valRes.status == 200) {
                //     handlePay()
                // }
                // else {
                //     toast.error('Payment not legit!!')
                // }
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": paymentt.name, //your customer's name
                "email": sessionStorage.getItem('email'),
                "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    }

    return (
        <>
            <Header />
            <div className='container-fluid p-5' >
                <div>
                    <h3 className='text-center' style={{ backgroundColor: 'white', padding: '20px' }}>Checkout</h3>
                    <hr />

                    <div className='bg-white p-5 shadow'>
                        <Row>
                            <Col sm={12} md={8} >
                                <h5><b>{dishResponse?.name}</b></h5>
                                <hr />
                                <div className='my-3'>
                                    <input type="number" placeholder='quantity' className='form-control' defaultValue={1} onChange={(e) => { setPayment({ ...paymentt, qty: e.target.value }) }} />
                                </div>
                                <p>Total Amount : {paymentt.tamount}</p>
                            </Col>
                            <Col sm={12} md={4} >
                                <img src={`${baseUrl}/Uploads/${dishResponse?.image}`}
                                    alt="" className='img-fluid' style={{ height: '150px', width: '40%' }} />
                            </Col>
                        </Row>
                    </div>

                    <div className='p-5 mt-5 shadow'>
                        <h5><i className="fa-solid fa-location-dot me-1" size="lg" /><b>Address</b></h5>
                        <hr />
                        <input type="text" placeholder='Name' className='form-control mb-3' onChange={(e) => { setPayment({ ...paymentt, name: e.target.value }) }} />
                        <div className='d-flex justify-content-center align-items-center' >
                            <div className='d-grid col-6 d-flex justify-content-between'>
                                <input type="text" placeholder='Flat No./house No' className='form-control mb-3 me-5' onChange={(e) => { setPayment({ ...paymentt, house: e.target.value }) }} />
                                <input type="text" className='form-control mb-3 me-5' placeholder='Landmark' onChange={(e) => { setPayment({ ...paymentt, landmark: e.target.value }) }} />
                            </div>
                            <div className='d-grid col-6 d-flex justify-content-between'>
                                <input type="text" placeholder='Pincode' className='form-control mb-3 me-5' onChange={(e) => { setPayment({ ...paymentt, pin: e.target.value }) }} />
                                <input type="text" className='form-control mb-3' placeholder='City' onChange={(e) => { setPayment({ ...paymentt, city: e.target.value }) }} />
                            </div>
                        </div>
                        <input type="text" placeholder='Mobile No.' className='form-control mb-3' onChange={(e) => { setPayment({ ...paymentt, mob: e.target.value }) }} />
                        <div className='d-grid mx-auto col-3'>
                            <button className='btn btn-success' onClick={handleOnSave}>Save</button>
                        </div>
                    </div>

                    <div className='p-5 mt-5 shadow'>
                        <h5><i className="fa-solid fa-money-check-dollar me-1" size="lg" /><b>Payment</b></h5>
                        <hr />
                        <p>Payment Method:</p>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Credit Card" onChange={handleChange} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Credit Card
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Debit Card" onChange={handleChange} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Debit Card
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="UPI" onChange={handleChange} />
                            <label class="form-check-label" for="flexRadioDefault3">
                                UPI
                            </label>
                        </div>
                        <div className='mt-3'>
                            <p>Selected Payment Method: {selectedValue}</p>
                        </div>
                        <div className='d-grid col-1'><button className='btn btn-primary' onClick={handleRazorpay}> Pay</button></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment