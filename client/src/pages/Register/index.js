
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import useHookMutation from '../../hooks/useHookMutation';
import Alert from '../../components/Alert';
import { identityService } from '../../services/IdentityService';
import { fetchCreateNotify } from '../../redux/slice/notify.slice';
import { Box } from '@mui/material';



function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirm: '',
    });
    const [message, setMessage] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerMutation = useHookMutation((data) => {
        const { username, password } = data;
        return identityService.register(username, password);
    });

    const { isPending: isFetchRegisterLoading } = registerMutation;


    const handleRegister = async () => {
        const { password, password_confirm } = formData;
        if (password !== password_confirm) {
            setMessage({
                type: 'error',
                title: 'Đăng ký thất bại',
                message: 'Mật khẩu xác nhận không khớp'
            });
            return;
        }

        registerMutation.mutate(formData, {
            onSuccess: (data) => {
                setFormData({});
                setMessage({
                    type: 'success',
                    title: 'Đăng ký thành công',
                    message: 'Đăng ký thành công, chuyển trang đăng nhập sau 3 giây'
                });

                dispatch(fetchCreateNotify({
                    sender_id: 'system',
                    receiver_id: data?.acc_id,
                    title: 'Thông báo hệ thống',
                    content: 'Chào mừng đến với ứng dụng mạng Hippo, khám phá ngay thôi!',
                    type: 'infomation',
                    isRead: false,
                }));

                setTimeout(() => {
                    navigate('/login');
                }, 3000);


            },
            onError: (data) => {
                console.log(data);

                setMessage({
                    type: 'error',
                    title: 'Đăng ký thất bại',
                    message: data?.response?.data?.error
                });
            }
        });
    };


    useEffect(() => {
        let timerId = setTimeout(() => {
            setMessage(null)
        }, [3000])

        return () => clearInterval(timerId);
    }, [message])


    return (
        <Box
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            sx={{
                width: {
                    lg: '25%'
                }
            }}
        >
            <div className="fl flex-col items-center justify-center border border-solid border-black shadow-sm rounded-lg py-3 px-10">
                <p className='font-serif text-7xl text-center pt-10 py-16'>Hippo</p>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <input type="text" name='username' value={formData?.username} onChange={handleOnChange} className="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg" placeholder="Tên đăng nhập" />
                        <input type="password" name='password' value={formData?.password} onChange={handleOnChange} className="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg" placeholder="Mật khẩu" />
                        <input type="password" name='password_confirm' value={formData.password_confirm} onChange={handleOnChange} className="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg" placeholder="Nhập lại mật khẩu" />
                    </div>
                    <div className='relative'>
                        <button
                            onClick={handleRegister}
                            disabled={isFetchRegisterLoading}
                            className={`w-full text-white bg-blue-700 hover:bg-blue-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${isFetchRegisterLoading && 'opacity-50'}`}
                        >Đăng kí</button>
                        {isFetchRegisterLoading && <Loader size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
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

        </Box>

    );
}

export default Register;