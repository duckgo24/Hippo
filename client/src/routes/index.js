
import ForgetPassword from "../pages/forgetpassword";
import Home from "../pages/home";
import Login from "../pages/login";
import Reels from "../pages/Reels";
import Register from "../pages/register";



export const myRoutes = [
    {
        path: '/',
        component: Home,
        isShowHeader: true,
    },
    {
        path: '/login',
        component: Login,
        isShowHeader: false,
    },
    {
        path: '/register',
        component: Register,
        isShowHeader: false,
    },
    {
        path: '/forget-password',
        component: ForgetPassword,
        isShowHeader: false,
    },
    {
        path: '/reels',
        component: Reels,
        isShowHeader: true,
    }
]