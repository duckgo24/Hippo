import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import logo from '../../images/logo.png';

import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { fetchLogin } from '../../redux/slice/account.slice';
import Alert from '../../components/Alert';
import OAuthGoogle from '../../services/oauth/oauth.google';
import { FaFacebookF, FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { Divider } from '@mui/material';
import { BsFacebook, BsGoogle } from 'react-icons/bs';


function Test() {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState();
    const { status_account, my_account } = useSelector(state => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        dispatch(fetchLogin(formData))
    }

    useEffect(() => {
        if (status_account === 'failed') {
            setMessage({
                type: 'error',
                title: 'Lỗi',
                message: 'Thông tin tài khoản và mật không chính xác!'
            })
        }

        if (status_account === 'succeeded') {
            navigate('/');
        }

        if (status_account === 'idle') {
            setMessage(null);
        }


    }, [dispatch, status_account, message, my_account]);

    return (
        <div className='w-1/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className="fl flex-col items-center justify-center border border-solid border-black shadow-sm rounded-lg py-3 px-10">
                <p className='font-serif text-7xl text-center pt-10 py-16'>Hippo</p>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <input type="text" id="first_name" class="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg" placeholder="Tên đăng nhập" />
                        <input type="text" id="first_name" class="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg" placeholder="Mật khẩu" />
                    </div>
                    <button type="button" class="w-full text-white bg-blue-700 hover:bg-blue-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đăng nhập</button>
                </div>
                <div className='flex items-center opacity-60 py-4'>
                    <Divider className='flex-1 bg-black' />
                    <p className='px-3'>OR</p>
                    <Divider className='flex-1 bg-black' />
                </div>

                <div className='flex items-center justify-center text-blue-700 gap-2 py-2'>
                    <BsFacebook size={25} />
                    <p className='font-bold'>Đăng nhập với facebook</p>
                </div>

                <Link className='text-center block' to='/forget-passwords'>Quên mật khẩu ?</Link>
            </div>
            <div className="flex gap-2 items-center justify-center mt-4 border border-solid border-black shadow-sm rounded-lg py-3 px-10">
                <p>Bạn chưa có tài khoản ?</p>
                <Link to='/register' className='text-blue-800 font-bold'>Tạo tài khoản</Link>
            </div>
            <div className='flex flex-col items-center justify-center py-4 gap-2'>
                <p>Tải ứng dụng ngay.</p>
                <div className='flex gap-2'>
                    <img src="/image/app-store.png" alt="app-store" className='h-10 w-32' />
                    <img src="/image/ch-play.png" alt="ch-play" className='h-10 w-32' />
                </div>
            </div>
        </div>
    );
}

export default Test;