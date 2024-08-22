
import ForgetPassword from "../pages/forgetpassword";
import Home from "../pages/home";
import Login from "../pages/login";
import Profile from "../pages/Profile";
import Reels from "../pages/Reels";
import Register from "../pages/register";
import Search from "../pages/Search";



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
    } ,
    {
        path: '/search',
        component: Search,
        isShowHeader: true,
    },
    {
        path: '/profile/:nickname',
        component: Profile,
        isShowHeader: true,
    }
]