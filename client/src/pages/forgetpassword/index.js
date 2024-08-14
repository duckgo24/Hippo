import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import logo from '../../images/logo.png';
import styles from './ForgetPassword.module.scss';
import Paragraph from '../../components/paragraph';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { fetchForgetPassword } from '../../redux/slice/account.slice';
import Loader from '../../components/Loader';

const cx = classNames.bind(styles);

function ForgetPassword() {
    const [username, setUsername] = useState();
    const [message, setMessage] = useState();
    const { status } = useSelector(state => state.account);
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setUsername(e.target.value);
    }

    const handleForgetPassword = () => {
        dispatch(fetchForgetPassword(username));
    }

    useEffect(() => {
        if (status === 'succeeded') {
            setUsername('')
            setMessage({
                type: 'success',
                title: 'Thành công',
                message: 'Liên kết đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến để truy cập lại vào tài khoản.'
            });

        }
        if (status === 'failed') {
            setMessage({ type: 'error', title: 'Có lỗi xảy ra', message: 'Vui lòng kiểm tra lại thông tin !' });
        }

        if (status === 'idle') {
            setMessage(null);
        }

    }, [status]);

    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='100vh'
            maxWidth='100%'
        >
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                minHeight='400px'
                maxWidth='25%'
                textAlign='center'
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                padding='24px'
                gap='4px'

            >
                <img src={logo} alt="Logo" className={cx('logo')} />
                <Paragraph text="Bạn gặp sự có khi đăng nhập ?" size="20px" bold='500' color='black' />
                <Paragraph text="Nhập email, số điện thoại hoặc tên người dùng của bạn và chúng tôi sẽ gửi cho bạn một liên kết để truy cập lại vào tài khoản." size="14px" color='gray' />
                <input type="text" placeholder="Nhập số điện thoại hoặc tên người dùng" className={cx('input')} value={username} onChange={handleOnChange} />
                <div style={{
                    position: 'relative',
                    width: '100%',
                }}>
                    <Button
                    primary
                    large
                    style={{
                        marginTop: '10px',
                        fontWeight: '400',
                        fontSize: '14px',
                        padding: '10px 20px',
                    }}
                    disabled={status === 'loading'}
                    onClick={handleForgetPassword}
                >
                    Gửi mật khẩu
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
                <Link to='/register'>Tạo tài khoản mới</Link>

                <Button to='/login'>Quay lại đăng nhập</Button>
            </Box>
            {message && <Alert type={message.type} title={message.title} message={message.message} />}




        </Box>
    );
}

export default ForgetPassword;