import React from 'react';
import '../CartStyles/Payment.css'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutPath from './CheckoutPath';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Payment() {
    const orderItem=JSON.parse(sessionStorage.getItem('orderItem'))
    const {user}=useSelector(state=>state.user)
    const {shippingInfo}=useSelector(state=>state.cart)
    const navigate=useNavigate();
    const completePayment=async(amount)=>{
      try{
    const {data:keyData}=await axios.get('/api/v1/getKey');
    const {key}=keyData;
    
    const {data:orderData}=await axios.post('/api/v1/payment/process'  ,{amount});
    const {order}=orderData

    const options = {
      key, 
      amount,
      currency: 'INR',
      name: 'ShopEasy',
      description: 'Ecommerce Website Payment Transaction',
      order_id: order.id,
      handler:async function(response){
        const {data}=await axios.post('/api/v1/paymentVerification',{
          razorpay_payment_id:response.razorpay_payment_id,
          razorpay_order_id:response.razorpay_order_id,
          razorpay_signature:response.razorpay_signature
        })
        if(data.success){
          navigate(`/paymentSuccess?reference=${data.reference}`)
        }else{
          alert('Payment verification Failed')
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNumber
      },
      theme: {
        color: '#3399cc'
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }catch(error){
     toast.error(error.message,{position:'top-center',autoClose:3000});
    
  }
    }
  return (
  <>
  <PageTitle title="Payment Processing"/>
  <Navbar/>
    <CheckoutPath activePath={2}/>
    <div className="payment-container">
        <Link to="/order/confirm" className='payment-go-back'>Go Back</Link>
        <button className="payment-btn" onClick={()=>completePayment(orderItem.total)}>Pay ({orderItem.total})/-</button>
    </div>
  <Footer/>
  </>
  )
}

export default Payment
