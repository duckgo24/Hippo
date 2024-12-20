import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import OAuthGoogle from '../../services/oauth/oauth.google';
import { BsFacebook } from 'react-icons/bs';
import useHookMutation from '../../hooks/useHookMutation';
import { identityService } from '../../services/IdentityService';
import Cookie from 'js-cookie';
import { setMyAccount } from '../../redux/slice/account.slice';


function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState();
    const { status_account, my_account } = useSelector(state => state.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loginMutation = useHookMutation((data) => {
        const { username, password } = data;
        return identityService.login(username, password);
    });

    const { isPending: isFetchLoginLoading } = loginMutation;


    const handleLogin = () => {
        loginMutation.mutate(formData, {
            onSuccess: async (data) => {

                if(data?.account?.isBan) {
                    setMessage({
                        type: 'error',
                        title: 'Thông báo',
                        message: 'Tài khoản của bạn đã bị khóa'
                    });
                    Cookie.remove('access_token');
                    Cookie.remove('refresh_token');
                    return;
                }


                const { access_token, refresh_token } = data;
                Cookie.set('access_token', access_token, { expires: 10, path: '/' });
                Cookie.set('refresh_token', refresh_token, { expires: 365, path: '/' })
                dispatch(setMyAccount(data?.account));
                setFormData({});
                navigate('/');
            },
            onError: (data) => {
                setMessage({
                    type: 'error',
                    title: 'Thông báo',
                    message: data?.response?.data?.error
                });
            }

        });
    }
    useEffect(() => {
        let timerId = setTimeout(() => {
            setMessage(null)
        }, [3000])

        return () => clearInterval(timerId);
    }, [message])


    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className="fl flex-col items-center justify-center border border-solid border-black shadow-sm rounded-lg py-3 px-10">
                <p className='font-serif text-7xl text-center pt-10 py-16'>Hippo</p>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <input
                            type="text"
                            name='username'
                            value={formData?.username}
                            onChange={handleOnChange}
                            className="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg"
                            placeholder="Tên đăng nhập"
                        />
                        <input
                            type="password"
                            name='password'
                            value={formData?.password}
                            onChange={handleOnChange}
                            className="bg-gray-50 border border-black border-solid py-2 px-2 text-gray-900 text-sm rounded-lg"
                            placeholder="Mật khẩu"
                        />
                    </div>
                    <div className='relative'>
                        <button onClick={handleLogin} className={`w-full text-white bg-blue-700 hover:bg-blue-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${isFetchLoginLoading && 'opacity-50'}`}>Đăng nhập</button>
                        {isFetchLoginLoading && <Loader size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                    </div>
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

                <Link className='text-center block' to='/forget-password'>Quên mật khẩu ?</Link>
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
            {message && <Alert type={message.type} title={message.title} message={message.message} />}
        </div>
    );
}

export default Login;
