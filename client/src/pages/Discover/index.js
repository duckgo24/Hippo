
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Discover() {


    const [amount, setAmount] = useState(0);
    const [orderId, setOrderId] = useState('');

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/payment', {
                amount: 1000,
                bankCode: 'NCB',
                orderInfo: 'Thanh toán hóa đơn',
                orderType: 'billpayment',
            });
    
            
        
           
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    return (
        <div>
            <h2>Thanh toán VNPay</h2>
            <input
                type="text"
                placeholder="Mã đơn hàng"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Số tiền"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Thanh toán</button>
        </div>
    );
};







export default Discover;