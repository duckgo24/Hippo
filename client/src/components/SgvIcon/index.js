
import SvgIcon from '@mui/material/SvgIcon';
import classNames from 'classnames/bind';

import styles from './SgvIcon.module.scss';

import userAvatar from '../../images/white-avatar.png'

const cx = classNames.bind(styles);


const HomeIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <SvgIcon
            aria-label="Trang chủ"
            height={size}
            role="img"
            viewBox="0 0 24 24"
            width={size}
        >
            <title>Trang chủ</title>
            <path
                fill={color}
                d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
                stroke="currentColor"
                strokeLinejoin="round" strokeWidth="2"
            >
            </path>
        </SvgIcon>
    );
}

const SearchIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <SvgIcon
            aria-label="Tìm kiếm"
            height={size}
            role="img"
            viewBox="0 0 24 24"
            width={size}>
            <title>Tìm kiếm</title>
            <path
                d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                fill='none'
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="2">
            </path>
            <line
                fill="#000"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2" x1="16.511"
                x2="22" y1="16.511"
                y2="22">
            </line>
        </SvgIcon>
    )
}

const DiscoverIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <SvgIcon
            aria-label="Khám phá"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24">
            <title>Khám phá</title>
            <polygon fill="none"
                points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="2">
            </polygon>
            <polygon
                fillRule="evenodd"
                points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056">

            </polygon>
            <circle
                cx="12.001"
                cy="12.005"
                fill="none"
                r="10.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2">
            </circle>
        </SvgIcon>
    )
}

const ReelsIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <SvgIcon
            aria-label="Reels"
            fill='none'
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <title>Reels</title>
            <line
                fill='none'
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="2.049"
                x2="21.95"
                y1="7.002"
                y2="7.002">
            </line>
            <line
                fill='none'
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="13.504"
                x2="16.362"
                y1="2.001"
                y2="7.002">
            </line>
            <line
                fill='none'
                troke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="7.207"
                x2="10.002"
                y1="2.11"
                y2="7.002">
            </line>
            <path
                d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                fill='none'
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2">
            </path>
            <path
                d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                fillRule="evenodd">
            </path>
        </SvgIcon>
    )
}

const MessageIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <SvgIcon aria-label="Messenger" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
            <title>Messenger</title>
            <path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path>
            <path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path>
        </SvgIcon>
    )
}

const HealIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <SvgIcon
            aria-label="Thông báo"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24">
            <title>Thông báo</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></SvgIcon>
    )
}

const PlusIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <SvgIcon aria-label="Bài viết mới" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
            <title>Bài viết mới</title>
            <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
        </SvgIcon>
    )
}

const MenuIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <SvgIcon aria-label="Cài đặt" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
            <title>Cài đặt</title>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line>
        </SvgIcon>
    )
}

const SettingIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <SvgIcon aria-label="Cài đặt" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18">
            <title>Cài đặt</title>
            <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
            <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
        </SvgIcon>
    )
}

const ActiveIcon = () => {
    return (
        <svg aria-label="Hoạt động của bạn"  fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Hoạt động của bạn</title><path d="M19 1H5C2.794 1 1 2.794 1 5v14c0 2.206 1.794 4 4 4h14c2.206 0 4-1.794 4-4V5c0-2.206-1.794-4-4-4ZM5 3h14c1.103 0 2 .897 2 2v6h-2.382l-2.723-5.447c-.34-.678-1.45-.678-1.79 0L9 15.764l-2.105-4.211A1 1 0 0 0 6 11H3V5c0-1.103.897-2 2-2Zm14 18H5c-1.103 0-2-.897-2-2v-6h2.382l2.723 5.447a1 1 0 0 0 1.79 0L15 8.236l2.105 4.211A1 1 0 0 0 18 13h3v6c0 1.103-.897 2-2 2Z"></path></svg>
    )
}

const SaveIcon = () => {
    return (
        <svg aria-label="Đã lưu" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Đã lưu</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
    )
}

const ReportIcon = () => {
    return (
        <svg aria-label="Báo cáo sự cố"  fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Báo cáo sự cố</title><path d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"></path></svg>
    )
}

const ChangeIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 -0.5 17 17">

            <title>Chuyển tài khoản</title>

            <defs>

            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(1.000000, 0.000000)" fill="#434343">
                    <path d="M1.539,8.001 C2.367,8.001 2.918,7.45 2.918,6.622 L2.914,6.187 C2.914,6.187 2.709,4.954 4.354,4.954 L11.015,5 L11.015,6.759 C11.338,7.081 11.862,7.081 12.185,6.759 L14.758,4.187 C15.08,3.863 15.08,3.339 14.758,3.017 L12.185,0.292 C11.862,-0.03 11.338,-0.03 11.015,0.292 L11.015,2.137 C10.854,2.09 4.562,2.063 4.562,2.063 C0.851,2.063 0.039,4.492 0.039,5.47 L0.039,6.501 C0.039,7.329 0.711,8.001 1.539,8.001 L1.539,8.001 Z">

                    </path>
                    <path d="M13.5,8.042 C12.672,8.042 12,8.626 12,9.454 L12.002,10.411 C11.957,10.768 11.357,11.001 10.477,11.001 L3.938,11.001 L3.936,9.442 C3.614,9.12 3.09,9.12 2.766,9.442 L0.194,12.014 C-0.128,12.338 -0.128,12.862 0.194,13.184 L2.766,15.756 C3.09,16.08 3.614,16.08 3.936,15.756 L3.938,13.905 L10.477,13.905 C14.188,13.905 15,11.463 15,10.484 L15,9.453 C15,8.626 14.328,8.042 13.5,8.042 L13.5,8.042 Z">

                    </path>
                </g>
            </g>
        </svg>
    )
}

const LogOutIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"  width="18px" height="18px" viewBox="0 0 20 20">

            <title>Log out</title>
            <defs>

            </defs>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -6199.000000)" fill="#000000">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M258,6051 L259,6051 C259.552,6051 260,6051.247 260,6051.799 L260,6051.598 C260,6052.15 260,6052.611 259,6052.611 L259,6052.637 C258,6052.637 258,6053.136 258,6053.689 L258,6053.792 C258,6054.345 257.552,6055 257,6055 L255,6055 C254.448,6055 254,6054.449 254,6053.896 L254,6053.792 C254,6053.24 253.552,6053 253,6053 L249,6053 C248.448,6053 248,6052.449 248,6051.896 L248,6051.792 C248,6051.24 248.448,6051 249,6051 L254,6051 L258,6051 Z M260,6046 C260,6046.552 259.552,6047 259,6047 L257,6047 C256.448,6047 256,6046.552 256,6046 C256,6045.448 256.448,6045 257,6045 L259,6045 C259.552,6045 260,6045.448 260,6046 L260,6046 Z M252,6046 C252,6046.552 251.552,6047 251,6047 L249,6047 C248.448,6047 248,6046.552 248,6046 C248,6045.448 248.448,6045 249,6045 L251,6045 C251.552,6045 252,6045.448 252,6046 L252,6046 Z M262,6056 C262,6056.552 261.552,6057 261,6057 L247,6057 C246.448,6057 246,6056.552 246,6056 L246,6042 C246,6041.448 246.448,6041 247,6041 L261,6041 C261.552,6041 262,6041.448 262,6042 L262,6056 Z M264,6041 C264,6039.895 263.105,6039 262,6039 L246,6039 C244.895,6039 244,6039.895 244,6041 L244,6057 C244,6058.105 244.895,6059 246,6059 L262,6059 C263.105,6059 264,6058.105 264,6057 L264,6041 Z" id="emoji_tongue_sticking_out-_square_round-[#442]">

                        </path>
                    </g>
                </g>
            </g>
        </svg>
    )
}


const UserIcon = ({ size = 30, ...props }) => {
    return (
        <img src={userAvatar} alt='User Avatar' style={{ width: size, height: size, borderRadius: '50%' }} />
    )
}

const DarkIcon = () => {
    return (
        <SvgIcon aria-label="Biểu tượng chủ đề" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18">
            <title>Biểu tượng chủ đề</title>
            <path d="M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z"></path>
        </SvgIcon>
    )
}


const LightIcon = () => {
    return (
        <SvgIcon aria-label="Biểu tượng chủ đề" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18">
            <title>Biểu tượng chủ đề</title>
            <path d="M12.00018,4.5a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0V3.5A1.00005,1.00005,0,0,0,12.00018,4.5ZM5.28241,6.69678A.99989.99989,0,1,0,6.69647,5.28271l-1.06054-1.061A.99989.99989,0,0,0,4.22186,5.63574ZM4.50018,12a1,1,0,0,0-1-1h-1.5a1,1,0,0,0,0,2h1.5A1,1,0,0,0,4.50018,12Zm.78223,5.30322-1.06055,1.061a.99989.99989,0,1,0,1.41407,1.41406l1.06054-1.061a.99989.99989,0,0,0-1.41406-1.41407ZM12.00018,19.5a1.00005,1.00005,0,0,0-1,1V22a1,1,0,0,0,2,0V20.5A1,1,0,0,0,12.00018,19.5Zm6.71729-2.19678a.99989.99989,0,0,0-1.41406,1.41407l1.06054,1.061A.99989.99989,0,0,0,19.778,18.36426ZM22.00018,11h-1.5a1,1,0,0,0,0,2h1.5a1,1,0,0,0,0-2ZM18.01044,6.98975a.996.996,0,0,0,.707-.293l1.06055-1.061A.99989.99989,0,0,0,18.364,4.22168l-1.06054,1.061a1,1,0,0,0,.707,1.707ZM12.00018,6a6,6,0,1,0,6,6A6.00657,6.00657,0,0,0,12.00018,6Zm0,10a4,4,0,1,1,4-4A4.00458,4.00458,0,0,1,12.00018,16Z"></path>
        </SvgIcon>)
}


export {
    HomeIcon, SearchIcon, DiscoverIcon,
    ReelsIcon, MessageIcon, HealIcon,
    PlusIcon, MenuIcon, UserIcon,
    SettingIcon, LightIcon, DarkIcon,
    ActiveIcon, SaveIcon, ReportIcon,
    ChangeIcon, LogOutIcon
};
