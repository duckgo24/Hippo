
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SocketService from '../../utils/SocketService';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../providers/socket.provider';

function Discover() {

    const { my_account } = useSelector(state => state.account);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    const [orderId, setOrderId] = useState('');
    const socket = useSocket();

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

    const handleTest = () => {
        socket.emit('send-notify', {
            senderId: my_account.acc_id,
            receiverId: 'ec96ee45-75f2-4cb6-83c7-7e61235a4fa6',
            data: {
                message: 'Hello, this is a test notification',
            }
        });



    }

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
            <Button onClick={handleTest}>Test</Button>
        </div>
    );
};







export default Discover;