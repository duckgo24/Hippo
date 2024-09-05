
import Chat from "../pages/Chat";
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
        isShowNavigate: true,
    },
    {
        path: '/login',
        component: Login,
        isShowNavigate: false,
    },
    {
        path: '/register',
        component: Register,
        isShowNavigate: false,
    },
    {
        path: '/forget-password',
        component: ForgetPassword,
        isShowNavigate: false,
    },
    {
        path: '/reels',
        component: Reels,
        isShowNavigate: true,
    } ,
    {
        path: '/search',
        component: Search,
        isShowNavigate: true,
    },
    {
        path: '/profile/:nickname',
        component: Profile,
        isShowNavigate: true,
    },
    {
        path: '/chat',
        component: Chat,
        isShowNavigate: false,
    }
]