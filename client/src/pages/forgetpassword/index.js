import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';

import logo from '../../images/logo.png';

import styles from './ForgetPassword.module.scss';

import Paragraph from '../../components/paragraph';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function ForgetPassword() {
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
                <input type="text" placeholder="Nhập số điện thoại hoặc tên người dùng" className={cx('input')} />
                <Button primary large style={{
                    fontWeight: '400',
                    fontSize: '14px'
                }}>Gửi mật khẩu</Button>

                <div className={cx('sepate')}>Hoặc</div>
                <Link to='/register'>Tạo tài khoản mới</Link>

                <Button to='/login'>Quay lại đăng nhập</Button>
            </Box>



        </Box>
    );
}

export default ForgetPassword;