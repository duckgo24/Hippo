

import classNames from 'classnames/bind';
import userAvatar from '../../images/white-avatar.png'
import styles from './Svg.module.scss';

const cx = classNames.bind(styles);


const HomeIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 26, ...props }) => {
    return (
        <svg
            aria-label="Trang chủ"
            height={size}
            color={color}
            role="img"
            viewBox="0 0 24 24"
            width={size}
        >
            <title>Trang chủ</title>
            <path
                fill="none"
                d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
                stroke="currentColor"
                strokeLinejoin="round" strokeWidth="2"
            >
            </path>
        </svg>
    );
}

const SearchIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 26, ...props }) => {
    return (
        <svg
            aria-label="Tìm kiếm"
            height={size}
            color={color}
            role="img"
            viewBox="0 0 24 24"
            width={size}
        >

            <title>Tìm kiếm</title>
            <path
                d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                fill='none'
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="2">
            </path>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2" x1="16.511"
                x2="22" y1="16.511"
                y2="22">
            </line>
        </svg>
    )
}

const DiscoverIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 26, ...props }) => {
    return (
        <svg
            aria-label="Khám phá"
            fill="currentColor"
            height={size}
            color={color}
            role="img"
            viewBox="0 0 24 24"
            width={size}
        >
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
        </svg>
    )
}

const ReelsIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 26, ...props }) => {
    return (
        <svg aria-label="Reels" color={color} fill="currentColor" height={size} role="img" viewBox="0 0 24 24" width={size}
        >
            <title>Reels</title>
            <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line>
            <path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            <path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path>
        </svg>
    )
}

const MessageIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 26, ...props }) => {
    return (
        <svg aria-label="Messenger" color={color} fill="currentColor" height={size} role="img" viewBox="0 0 24 24" width={size}>
            <title>Messenger</title>
            <path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path>
            <path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path>
        </svg>
    )
}

const HealIcon = ({ color = 'rgba(0, 0, 0, 0.54)', size = 26, active = false, ...props }) => {
    return (
        <svg
            className={cx(active ? 'active' : '')}
            title="Like Announce SVG File"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    )
}

const PlusIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 26, ...props }) => {
    return (
        <svg {...props} aria-label="Bài viết mới" color={color} fill="currentColor" height={size} role="img" viewBox="0 0 24 24" width={size}>
            <title>Bài viết mới</title>
            <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
        </svg>
    )
}

const MenuIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 24, ...props }) => {
    return (
        <svg aria-label="Cài đặt" color={color} fill="currentColor" height={size} role="img" viewBox="0 0 24 24" width={size}>
            <title>Cài đặt</title>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line>
        </svg>
    )
}

const SettingIcon = ({ color = 'rbga(0, 0, 0, 0.54)', size = 50, ...props }) => {
    return (
        <svg color='black' aria-label="Cài đặt" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18">
            <title>Cài đặt</title>
            <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
            <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
    )
}

const ActiveIcon = () => {
    return (
        <svg color='black' aria-label="Hoạt động của bạn" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Hoạt động của bạn</title><path d="M19 1H5C2.794 1 1 2.794 1 5v14c0 2.206 1.794 4 4 4h14c2.206 0 4-1.794 4-4V5c0-2.206-1.794-4-4-4ZM5 3h14c1.103 0 2 .897 2 2v6h-2.382l-2.723-5.447c-.34-.678-1.45-.678-1.79 0L9 15.764l-2.105-4.211A1 1 0 0 0 6 11H3V5c0-1.103.897-2 2-2Zm14 18H5c-1.103 0-2-.897-2-2v-6h2.382l2.723 5.447a1 1 0 0 0 1.79 0L15 8.236l2.105 4.211A1 1 0 0 0 18 13h3v6c0 1.103-.897 2-2 2Z"></path></svg>
    )
}

const SaveIcon = () => {
    return (
        <svg color='black' aria-label="Đã lưu" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Đã lưu</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
    )
}

const ReportIcon = () => {
    return (
        <svg color='black' aria-label="Báo cáo sự cố" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Báo cáo sự cố</title><path d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"></path></svg>
    )
}

const ChangeIcon = () => {
    return (
        <svg color='black' xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 -0.5 17 17">

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
        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 20 20">

            <title>Log out</title>
            <defs>

            </defs>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="DribbbleLight-Preview" transform="translate(-300.000000, -6199.000000)" fill="#000000">
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
        <svg color='black' aria-label="Biểu tượng chủ đề" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18">
            <title>Biểu tượng chủ đề</title>
            <path d="M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z"></path>
        </svg>
    )
}


const LightIcon = () => {
    return (
        <svg color='black' aria-label="Biểu tượng chủ đề" fill="currentColor" height="18" role="img" viewBox="0 0 24 24" width="18">
            <title>Biểu tượng chủ đề</title>
            <path d="M12.00018,4.5a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0V3.5A1.00005,1.00005,0,0,0,12.00018,4.5ZM5.28241,6.69678A.99989.99989,0,1,0,6.69647,5.28271l-1.06054-1.061A.99989.99989,0,0,0,4.22186,5.63574ZM4.50018,12a1,1,0,0,0-1-1h-1.5a1,1,0,0,0,0,2h1.5A1,1,0,0,0,4.50018,12Zm.78223,5.30322-1.06055,1.061a.99989.99989,0,1,0,1.41407,1.41406l1.06054-1.061a.99989.99989,0,0,0-1.41406-1.41407ZM12.00018,19.5a1.00005,1.00005,0,0,0-1,1V22a1,1,0,0,0,2,0V20.5A1,1,0,0,0,12.00018,19.5Zm6.71729-2.19678a.99989.99989,0,0,0-1.41406,1.41407l1.06054,1.061A.99989.99989,0,0,0,19.778,18.36426ZM22.00018,11h-1.5a1,1,0,0,0,0,2h1.5a1,1,0,0,0,0-2ZM18.01044,6.98975a.996.996,0,0,0,.707-.293l1.06055-1.061A.99989.99989,0,0,0,18.364,4.22168l-1.06054,1.061a1,1,0,0,0,.707,1.707ZM12.00018,6a6,6,0,1,0,6,6A6.00657,6.00657,0,0,0,12.00018,6Zm0,10a4,4,0,1,1,4-4A4.00458,4.00458,0,0,1,12.00018,16Z"></path>
        </svg>)
}

const TickIcon = () => {
    return (
        <svg aria-label="Đã xác minh" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Đã xác minh</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>
    )
}

const PlusIcon2 = ({ size = 30, ...props }) => {
    return (
        <svg {...props} aria-label="Biểu tượng dấu cộng" fill="currentColor" height={size} role="img" viewBox="0 0 24 24" width={size}><title>Biểu tượng dấu cộng</title><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
    )
}

const MediaIcon = ({ size = 160, ...props }) => {
    return (
        <svg color='black' aria-label="Biểu tượng thể hiện file phương tiện, chẳng hạn như hình ảnh hoặc video" fill="currentColor" height={size} role="img" viewBox="0 0 97.6 77.3" width={size + 16}><title>Biểu tượng thể hiện file phương tiện, chẳng hạn như hình ảnh hoặc video</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
    )
}

const EmojiIcon = ({ size = 12, ...props }) => {
    return (
        <svg aria-label="Biểu tượng cảm xúc" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Biểu tượng cảm xúc</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
    )
}

const DropDownIcon = ({ size = 22, ...props }) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width={size} height={size} x="0" y="0" viewBox="0 0 29 29" ><path d="M14.5 27.065a12.465 12.465 0 0 1-8.839-3.655c-4.874-4.874-4.874-12.804 0-17.678 2.361-2.361 5.5-3.662 8.839-3.662s6.478 1.3 8.839 3.662c4.874 4.874 4.874 12.804 0 17.678a12.465 12.465 0 0 1-8.839 3.655zm0-22.995a10.43 10.43 0 0 0-7.425 3.076c-4.093 4.094-4.093 10.755 0 14.85 4.094 4.093 10.755 4.093 14.85 0 4.093-4.094 4.093-10.755 0-14.85A10.434 10.434 0 0 0 14.5 4.07zm8.132 18.633h.01-.01z" /><path d="M14.5 17.869a.997.997 0 0 1-.707-.293L9.197 12.98a.999.999 0 1 1 1.414-1.414l3.889 3.889 3.889-3.889a.999.999 0 1 1 1.414 1.414l-4.596 4.596a.997.997 0 0 1-.707.293z" /></svg>
    )
}
const CheckIcon = ({ size = 22, ...props }) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" id="check">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
    )
}

const CloseIcon = ({ size = 22, ...props }) => {
    return (
        <svg
            {...props}
            aria-label="Đóng"
            fill="currentColor"
            height={size}
            role="img"
            viewBox="0 0 24 24"
            width={size}>
            <title>Đóng</title>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="3" y2="21"></line>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="21" y2="3"></line>
        </svg>
    )
}

const SubmitIcon = ({ size = 22, color = '#45aaf2', ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 32 32"
            viewBox="0 0 32 32"
            id="submit"
            width={size}
            height={size}
            {...props}
        >
            <g>
                <polygon fill={color} points="11 16 3 6 29 16 3 26"></polygon>
                <path fill="#3867d6" d="M3.0005,27c-0.3125,0-0.6147-0.1465-0.8076-0.4092c-0.2666-0.3652-0.2559-0.8633,0.0264-1.2158l7.5-9.375l-7.5-9.375C1.937,6.2725,1.9263,5.7744,2.1929,5.4092C2.459,5.0459,2.937,4.9043,3.3589,5.0664l26,10C29.7451,15.2148,30,15.5859,30,16s-0.2549,0.7852-0.6411,0.9336l-26,10C3.2417,26.9785,3.1201,27,3.0005,27z M6.0879,8.2588l5.6929,7.1162c0.2925,0.3652,0.2925,0.8848,0,1.25l-5.6929,7.1162L26.2144,16L6.0879,8.2588z"></path>
            </g>
        </svg>
    )
}

const MoreIcon = ({ size = 22, color = 'rbga(0, 0, 0, 0.54)', ...props }) => {
    return (
        <svg width={size} height={size} color={color} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="more">
            <g>
                <g>
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                    <circle cx="5" cy="12" r="2" />
                </g>
            </g>
        </svg>
    )
}

const DeleteIcon = ({ size = 22, color = 'rbga(0, 0, 0, 0.54)', ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size + 5}
            height={size}
            viewBox="0 0 24 18"
            id="delete"
            {...props}
        >
            <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g stroke="#000" strokeWidth="2" transform="translate(-1441 -1567)">
                    <g transform="translate(1442 1568)">
                        <path d="M20 0H7L0 8l7 8h13a2 2 0 002-2V2a2 2 0 00-2-2zM17 5l-6 6M11 5l6 6" />
                    </g>
                </g>
            </g>
        </svg>
    )
}

const BlockIcon = ({ size = 22, color = 'rgba(0, 0, 0, 0.54)', ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="block" width={size} height={size} {...props}>
            <path d="M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601 0-5.302-4.299-9.6-9.6-9.6zM2.399 10a7.6 7.6 0 0 1 12.417-5.877L4.122 14.817A7.568 7.568 0 0 1 2.399 10zm7.6 7.599a7.56 7.56 0 0 1-4.815-1.722L15.878 5.184a7.6 7.6 0 0 1-5.879 12.415z" />
        </svg>
    )
}

const SmileFaceIcon = ({ size = 22, color = 'rgba(0, 0, 0, 0.54)', ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} id="smile">
            <g fill="none" fillRule="evenodd" stroke={color}>
                <path d="M4.5 2.5h15a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3v-13a3 3 0 0 1 3-3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 2.5c-1.132 2-2.485 6.798-2.5 10h2c0 4.146.888 5.957 2 9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 13.5c1 2 3 3 5.5 3s4.5-1 5.5-3" />
                <path strokeLinecap="round" d="M7.5 7.5v2M16.5 7.5v2" />
            </g>
        </svg>
    )
}

const ImageIcon = ({ size = 22, color = 'rgba(0, 0, 0, 0.54)', ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" id="image">
            <path fill="#c6e3ff" d="M30 8v15.1L24 17l-6.68 5.13L11 13 2 23V8a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2Z"></path>
            <path fill="#0478ed" d="M30 24.1a1 1 0 0 1-.71-.3l-5.38-5.47-6 4.59a1 1 0 0 1-1.43-.22l-5.6-8.09-8.14 9.08A1 1 0 0 1 1 23V8a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v15.1a1 1 0 0 1-1 1ZM11 12h.06a1 1 0 0 1 .76.43l5.72 8.27 5.85-4.49a1 1 0 0 1 1.32.09L29 20.66V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12.41l7.26-8.08A1 1 0 0 1 11 12Z"></path>
            <path fill="#56aaff" d="M20 26H4a2 2 0 0 1-2-2v-1l9-10 6.32 9.13Z"></path>
            <path fill="#0478ed" d="M20 27H4a3 3 0 0 1-3-3v-1a1 1 0 0 1 .26-.67l9-10a1 1 0 0 1 1.57.1l9 13A1 1 0 0 1 20 27ZM3 23.4v.6a1 1 0 0 0 1 1h14.09L10.9 14.61Z"></path>
            <path fill="#56aaff" d="M30 23.1v.9a2 2 0 0 1-2 2h-8l-2.68-3.87L24 17Z"></path>
            <path fill="#0478ed" d="M28 27h-8a1 1 0 0 1-.82-.43L16.5 22.7a1 1 0 0 1 .21-1.36l6.68-5.13a1 1 0 0 1 1.32.09l6 6.1a1 1 0 0 1 .29.7v.9a3 3 0 0 1-3 3Zm-7.48-2H28a1 1 0 0 0 1-1v-.49l-5.09-5.18-5.22 4Z"></path>
            <circle cx="20" cy="12" r="2" fill="#56aaff"></circle>
        </svg>
    )
}

const GifIcon = ({ size = 22, color = 'rgba(0, 0, 0, 0.54)', ...props }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" id="gif">
            <path stroke="#000" strokeLinejoin="round" d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z"></path>
            <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M12 8V16M15 16V12M19 8H15.5C15.2239 8 15 8.22386 15 8.5V12M15 12H18M9 8H7.5C6.11929 8 5 9.11929 5 10.5V12 13.7778C5 15.0051 5.99492 16 7.22222 16V16C8.20406 16 9 15.2041 9 14.2222V12.5C9 12.2239 8.77614 12 8.5 12H7.5"></path>
        </svg>
    )
}


const AudioIcon = ({ size = 22, color = 'rgba(0, 0, 0, 0.54)', ...props }) => {
    return (
        <svg
            aria-label="Audio image"
            fill="currentColor"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            {...props}
        >
            <title>Audio image</title>
            <path d="M21.002 16.972V2.044a.999.999 0 0 0-.36-.769 1.012 1.012 0 0 0-.823-.214L6.816 3.479A1 1 0 0 0 6 4.462v10.864A3.75 3.75 0 1 0 9 19V9.56l9.003-1.675v5.442A3.75 3.75 0 1 0 21.005 17c0-.01-.003-.02-.003-.029Z"></path>
        </svg>
    )
}

const ShareIcon = ({ size = 22, color = 'rgba(0, 0, 0, 0.54)', ...props }) => {
    return (
        <svg aria-label="Share" fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
            <title>Share</title>
            <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
            <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
        </svg>
    )
}

const LocationIcon = ({ size = 22, color = '#000002', ...props }) => {
    return (
        <svg height={size} width={size} version="1.1" id="Capa_1" viewBox="0 0 255.856 255.856" >
            <g>
                <path fill={color} d="M127.928,38.8c-30.75,0-55.768,25.017-55.768,55.767s25.018,55.767,55.768,55.767   s55.768-25.017,55.768-55.767S158.678,38.8,127.928,38.8z M127.928,135.333c-22.479,0-40.768-18.288-40.768-40.767   S105.449,53.8,127.928,53.8s40.768,18.288,40.768,40.767S150.408,135.333,127.928,135.333z" />
                <path fill={color} d="M127.928,0C75.784,0,33.362,42.422,33.362,94.566c0,30.072,25.22,74.875,40.253,98.904   c9.891,15.809,20.52,30.855,29.928,42.365c15.101,18.474,20.506,20.02,24.386,20.02c3.938,0,9.041-1.547,24.095-20.031   c9.429-11.579,20.063-26.616,29.944-42.342c15.136-24.088,40.527-68.971,40.527-98.917C222.495,42.422,180.073,0,127.928,0z    M171.569,181.803c-19.396,31.483-37.203,52.757-43.73,58.188c-6.561-5.264-24.079-26.032-43.746-58.089   c-22.707-37.015-35.73-68.848-35.73-87.336C48.362,50.693,84.055,15,127.928,15c43.873,0,79.566,35.693,79.566,79.566   C207.495,112.948,194.4,144.744,171.569,181.803z" />
            </g>
        </svg>
    )
}

const BellIcon = ({ size = 22, color = 'rgba(0, 0, 0, 0.54)', ...props }) => {
    return (
        <svg
            viewBox="0 0 32 32" fill="#000000"
            height={size}
            width={size}
        >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
                <g id="Rectangle_1" data-name="Rectangle 1" transform="translate(4)" fill="none" stroke="#040505" strokeMiterlimit="10" strokeWidth="4">
                    <path d="M12,0h0A12,12,0,0,1,24,12V24a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V12A12,12,0,0,1,12,0Z" stroke="none"></path>
                    <path d="M12,2h0A10,10,0,0,1,22,12v8a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V12A10,10,0,0,1,12,2Z" fill="none"></path>
                </g>
                <rect id="Rectangle_2" data-name="Rectangle 2" width="32" height="4" rx="2" transform="translate(0 20)" fill="#040505"></rect>
                <path id="Path_9" data-name="Path 9" d="M16,32h0a4,4,0,0,1-4-4V26h8v2A4,4,0,0,1,16,32Z" fill="#040505"></path>
            </g>
        </svg>
    )
}

export {
    HomeIcon, SearchIcon, DiscoverIcon,
    ReelsIcon, MessageIcon, HealIcon,
    PlusIcon, MenuIcon, UserIcon,
    SettingIcon, LightIcon, DarkIcon,
    ActiveIcon, SaveIcon, ReportIcon,
    ChangeIcon, LogOutIcon, TickIcon,
    PlusIcon2, MediaIcon, EmojiIcon,
    DropDownIcon, CheckIcon, CloseIcon,
    SubmitIcon, MoreIcon, DeleteIcon,
    BlockIcon, SmileFaceIcon, ImageIcon,
    GifIcon, AudioIcon, ShareIcon,
    LocationIcon, BellIcon
};
