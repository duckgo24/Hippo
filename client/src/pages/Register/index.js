
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../../redux/slice/account.slice';
import Loader from '../../components/Loader';

import avatarWhite from '../../images/white-avatar.jpg'
import Alert from '../../components/Alert';
import { fetchCreateNotify } from '../../redux/slice/notify.slice';



function Register() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirm: '',
    });
    const [message, setMessage] = useState();
    const { status_account, my_account } = useSelector(state => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        const { username, password, password_confirm } = formData;
        if (password !== password_confirm) {
            setMessage({
                type: 'error',
                title: 'Đăng ký thất bại',
                message: 'Mật khẩu xác nhận không khớp'
            });
            return;
        }

        dispatch(fetchRegister({
            username,
            password,
            role: 'user',
            nickname: `user_${Math.floor(Math.random() * 10000).toString()}`,
            full_name: 'Người dùng Hippo',
            avatar: avatarWhite,
            bio: '',
            tick: false,
            isOnline: false,
            lastOnline: new Date(),
        }));

        setFormData({});
    }

    useEffect(() => {
        if (status_account === 'failed') {
            setMessage({
                type: 'error',
                title: 'Đăng ký thất bại',
                message: 'Có lỗi xảy ra, vui lòng thử lại sau'
            });
        }

        if (status_account === 'succeeded') {
            setMessage({
                type: 'success',
                title: 'Đăng ký thành công',
                message: 'Bạn đã đăng ký thành công, vui lòng đăng nhập'
            });

            dispatch(fetchCreateNotify({
                sender_id: 'system',
                receiver_id: my_account?.id,
                title: 'Thông báo hệ thống',
                content: 'Chào mừng đến với ứng dụng mạng Hippo, khám phá ngay thôi!',
                type: 'infomation',
                isRead: false,
            }));
            
            navigate('/login');


        }

        if (status_account === 'idle') {
            setMessage(null);
        }

        

    }, [status_account]);

    useEffect(() => {
        let timerId = setTimeout(() => {
            setMessage(null)
        }, [3000])

        return () => clearInterval(timerId);
    }, [message])


    return (
        <div className='w-1/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className="fl flex-col items-center justify-center border border-solid border-black shadow-sm rounded-lg py-3 px-10">
                <p className='font-serif text-7xl text-center pt-10 py-16'>Hippo</p>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <input type="text" name='username' value={formData?.username} onChange={handleOnChange} class="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg" placeholder="Tên đăng nhập" />
                        <input type="password" name='password' value={formData?.password} onChange={handleOnChange} class="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg" placeholder="Mật khẩu" />
                        <input type="password" name='password_confirm' value={formData.password_confirm} onChange={handleOnChange} class="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg" placeholder="Nhập lại mật khẩu" />
                    </div>
                    <div className='relative'>
                        <button onClick={handleRegister} className={`w-full text-white bg-blue-700 hover:bg-blue-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${status_account === 'loading' && 'opacity-50'}`}>Đăng kí</button>
                        {status_account === 'loading' && <Loader size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                    </div>
                </div>

                <div className='text-center text-sm opacity-70'>
                    <p className='py-2'>Những người sử dụng dịch vụ của chúng tôi có thể đã tải thông tin của bạn lên Hippo. </p>
                    <p>Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và Chính sách cookie của chúng tôi.</p>
                </div>
            </div>

            <div className="flex gap-2 items-center justify-center mt-4 border border-solid border-black shadow-sm rounded-lg py-3 px-10">
                <p>Bạn đã có tài khoản ?</p>
                <Link to='/login' className='text-blue-800 font-bold'>Đăng nhập</Link>
            </div>

            <div className='flex flex-col items-center justify-center py-4 gap-2'>
                <p>Tải ứng dụng ngay.</p>
                <div className='flex gap-2'>
                    <img src="/image/app-store.png" alt="app-store" className='h-10 w-32' />
                    <img src="/image/ch-play.png" alt="ch-play" className='h-10 w-32' />
                </div>
            </div>
            {message && <Alert type={message.type} title={message.title} message={message.message} />}

        </div>

    );
}

export default Register;