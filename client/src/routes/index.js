import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import Chat from "../pages/Chat";
import Discover from "../pages/Discover";
import Profile from "../pages/Profile";
import Reels from "../pages/Reels";
import Search from "../pages/Search";
import PostDetail from "../pages/PostDetail";
import Test from "../pages/Test/test";
import VideoDetail from "../pages/VideoDetail";
import CallScreenSender from "../pages/CallScreenSender";
import CallScreenReceiver from "../pages/CallScreenReceiver";



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
    },
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
        path: '/chat/:nickname',
        component: Chat,
        isShowNavigate: false,
    },
    {
        path: '/chat/',
        component: Chat,
        isShowNavigate: false,
    },
    {
        path: '/chat/:nickname',
        component: Chat,
        isShowNavigate: false,
    },
    {
        path: '/discover',
        component: Discover,
        isShowNavigate: true,
    },
    {
        path: '/post/:post_id',
        component: PostDetail,
        isShowNavigate: true,
    },
    {
        path: '/video/:video_id',
        component: VideoDetail,
        isShowNavigate: true,
    },
    {
        path: '/post/post_id=:post_id&comment_id=:comment_id',
        component: PostDetail,
        isShowNavigate: true,
    },
    {
        path: '/video/:video_id&comment_id=:comment_id',
        component: VideoDetail,
        isShowNavigate: true,
    },
    {
        path: '/test',
        component: Test,
        isShowNavigate: false
    },
    {
        path: 'call-screen-sender/:nickname',
        component: CallScreenSender,
        isShowNavigate: false
    },
    {
        path: 'call-screen-receiver/:nickname',
        component: CallScreenReceiver,
        isShowNavigate: false
    }
]