
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import Box from '@mui/material/Box';
import logo from '../../images/logo.png';
import styles from './Register.module.scss';
import Paragraph from '../../components/paragraph';
import Button from '../../components/Button';
import { fetchRegister } from '../../redux/slice/account.slice';
import Loader from '../../components/Loader';

import avatarWhite from '../../images/white-avatar.jpg'
import Alert from '../../components/Alert';

const cx = classNames.bind(styles);

function Register() {

    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState();
    const { status } = useSelector(state => state.account);
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        const { username, password, password_confirm} = formData;
        if(password !== password_confirm) {
            alert('Mật khẩu không khớp');
            return;
        }
        
        dispatch(fetchRegister({
            username,
            password,
            role: 'user',
            nickname: `user_${Math.floor(Math.random() * 10000).toString()}`,
            avatar: avatarWhite,
            status: 'offline',
            num_posts: 0,
            num_followers: 0,
            num_following: 0,
            bio: '',
            listriend: '[]',
        }));       

        setFormData({});
    }

    useEffect(() => {

        if(status === 'failed') {
            setMessage({
                type: 'error',
                title: 'Đăng ký thất bại',
                message: 'Có lỗi xảy ra, vui lòng thử lại sau'
            })
        }

        if(status === 'succeeded') {
            setMessage({
                type:'success',
                title: 'Đăng ký thành công',
                message: 'Bạn đã đăng ký thành công, vui lòng đăng nhập'
            })
        }

        if(status === 'idle') {
            setMessage(null);
        }

    }, [dispatch, status, message])


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
                <Paragraph text="Tạo tài khoản để sử dụng ứng dụng" size="16px" color='gray' />
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
                <input type="password" placeholder="Nhập lại mật khẩu" className={cx('input')} name='password_confirm' onChange={handleOnChange} />
                <div style={{
                    position: 'relative',
                    width: '100%',
                }}>
                    <Button primary large onClick={handleRegister} disabled={status === 'loading'}>
                        Đăng ký
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
                <div className={cx('sepate')}>Hoặc</div>


                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    gap='10px'
                    marginTop='14px'
                >
                    <Paragraph text="Bạn đã có tài khoản ?" />
                    <Link to='/login'>Đăng nhập ngay</Link>
                </Box>
            </Box>
            {message && <Alert type={message.type} title={message.title} message={message.message} />}
        </Box>
    );
}

export default Register;