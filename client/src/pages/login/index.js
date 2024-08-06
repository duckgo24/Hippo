import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import logo from '../../images/logo.png';

import styles from './Login.module.scss';

import Paragraph from '../../components/paragraph';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { fetchLogin } from '../../redux/slice/account.slice';
import Alert from '../../components/Alert';


const cx = classNames.bind(styles);

function Login() {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState();
    const { status, data } = useSelector(state => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        dispatch(fetchLogin(formData))
    }

    useEffect(() => {
        if (status === 'failed') {
            setMessage({
                type: 'error',
                title: 'Lỗi',
                message: 'Thông tin tài khoản và mật không chính xác!'
            })
        }

        if (status === 'succeeded') {
            localStorage.setItem("access_token", data.token);
            navigate('/');
        }

        if(status === 'idle') {
            setMessage(null);
        }


    }, [dispatch, status, message, data]);

    return (
        <Box
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            height='80vh'
            maxWidth='70%'
            margin='auto'
            textAlign='center'
        >
            <Box
                width='50%'
            >
                <img src={logo} alt="Logo" />
                <Paragraph text="Chào mừng đến với Hippo" size="24px" bold='500' color='black' />
                <Paragraph text="Vui lòng đăng nhập để sử dụng" size="16px" color='gray' />
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                flex={1}
                gap='10px'
                sx={{
                    padding: '25px',
                    bgcolor: '#fff',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    borderRadius: '5px',
                }}
                maxWidth='400px'
                minHeight='300px'

            >

                <input type="text" placeholder="Email" className={cx('input')} name='username' onChange={handleOnChange} />
                <input type="password" placeholder="Mật khẩu" className={cx('input')} name='password' onChange={handleOnChange} />
                <div style={{
                    position: 'relative',
                    width: '100%',
                }}>
                    <Button primary large onClick={handleLogin} disabled={status === 'loading'}>
                        Đăng nhập
                    </Button>
                    {status === 'loading'
                        &&
                        <Loader style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }} />
                    }
                </div>

                <Link
                    to='/forget-password'
                    style={{
                        marginTop: '10px',
                    }}  >
                    Quên mật khẩu?
                </Link>

                <div className={cx('sepate')}>Hoặc</div>


                <Button to='/register' small style={{
                    backgroundColor: 'rgba(0, 128, 0, 0.7)',
                    color: '#fff',
                }}>
                    Tạo tài khoản
                </Button>
            </Box>
            {message && <Alert type={message.type} title={message.title} message={message.message} />}
        </Box>
    );
}

export default Login;