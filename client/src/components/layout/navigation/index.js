import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Fade, Popper } from '@mui/material';
import RenderWithCondition from '../../RenderWithCondition';
import Paragraph from '../../Paragraph';

import styles from './Navigation.module.scss';
import {
    ActiveIcon, DiscoverIcon, HealIcon,
    HomeIcon, LightIcon, MenuIcon,
    MessageIcon, PlusIcon, ReelsIcon,
    SaveIcon, SearchIcon, SettingIcon,
    ReportIcon, ChangeIcon, LogOutIcon
} from '../../SgvIcon';
import { useSelector } from 'react-redux';
import ListNotify from '../../notify_component/ListNotify';
import Cookie from 'js-cookie';

const cx = classNames.bind(styles);


function Navigation() {
    const [openMoreAction, setOpenMoreAction] = useState(false);
    const [openPopperNotify, setOpenPopperNotify] = useState(false);
    const [anchorElMoreAction, setAnchorElMoreAction] = useState(null);
    const [anchorElPopper, setAnchorElPopper] = useState(null);
    const [navActive, setNavActive] = useState(0);
    const { my_account } = useSelector(state => state.account);
    const { notifies } = useSelector(state => state.notify);
    const navigate = useNavigate();


    const handleToggleNotify = (e) => {
        setAnchorElPopper(e.currentTarget);
        setOpenPopperNotify(prev => !prev);
    };

    const handleItemMoreActionClick = (e) => {
        setAnchorElMoreAction(e.currentTarget);
        setOpenMoreAction((prevOpen) => !prevOpen);
    };

    const handleNavClick = (index) => {
        setNavActive(index);
        setOpenMoreAction(false);
    };




    const ListNavigation = [
        {
            path: '/',
            name: 'Trang chủ',
            icon: <HomeIcon />,
            isActive: true,
        },
        {
            name: 'Tìm kiếm',
            icon: <SearchIcon />,
            path: '/search',
            isActive: false,
        },
        {
            path: '/discover',
            name: 'Khám phá',
            icon: <DiscoverIcon />,
            isActive: false,
        },
        {
            path: '/reels',
            name: 'Reels',
            icon: <ReelsIcon />,
            isActive: false,
        },
        {
            path: '/chat',
            name: 'Tin nhắn',
            icon: <MessageIcon />,
            isActive: false,
        },
        {
            name: 'Thông báo',
            icon: <HealIcon />,
            isActive: false,
            onClick: (e) => handleToggleNotify(e),
            popper: <ListNotify open={openPopperNotify} />,
        },

        {
            path: '/sell',
            name: 'Mua hàng',
            icon: <PlusIcon />,
            isActive: false,
        },
        {
            name: 'Trang cá nhân',
            icon: <img src={my_account?.avatar} className="rounded-full w-8 h-8" />,
            isActive: false,
            onClick: () => navigate(`/profile/${my_account?.nickname}`, {
                state: {
                    account: my_account,
                }
            }),

        },
    ];

    const moreActions = [
        {
            path: '/setting',
            name: 'Cài đặt',
            icon: <SettingIcon />,
        },
        {
            path: '/activity',
            name: 'Hoạt động của bạn',
            icon: <ActiveIcon />,
        },
        {
            path: '/saved',
            name: 'Đã lưu',
            icon: <SaveIcon />,
        },
        {
            path: '/toggle-mode',
            name: 'Chuyển chế độ',
            icon: <LightIcon />,
        },
        {
            path: '/report',
            name: 'Báo cáo',
            icon: <ReportIcon />,
        },
        {
            path: '/switch-account',
            name: 'Chuyển tài khoản',
            icon: <ChangeIcon />,
            isDivider: true,
        },
        {
            name: 'Đăng xuất',
            icon: <LogOutIcon />,
            onClick: () => {
                Cookie.remove('access_token');
                Cookie.remove('refresh_token');
                localStorage.clear();
                navigate('/login');

            },
            isDivider: true,
        },
    ];



    return (
        <Paper
            className="fix top-0 left-0 z-50"
            sx={{
                height: '100vh',
                width: {
                    xs: '80px',
                    md: '80px',
                    lg: openPopperNotify ? '80px' : '224px',
                }
            }}>
            <MenuList>
                <MenuItem className={cx('navbar-btn')} style={{ height: '150px' }}>
                    <Box
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'none',
                                lg: openPopperNotify ? 'none' : 'block',
                            }
                        }}
                    >
                        <p className="pb-5 text-4xl font-extrabold ml-5" style={{
                            fontFamily: "Edu AU VIC WA NT Hand",
                        }}>Hippo</p>
                    </Box>

                    <Box
                        sx={{
                            display: {
                                xs: 'block',
                                md: 'block',
                                lg: openPopperNotify ? 'block' : 'none',
                            }
                        }}
                    >
                        <img src="../image/logo.png" alt='logo' className='w-24 h-14' />
                    </Box>
                </MenuItem>
                {ListNavigation.map((nav, index) => (
                    <MenuItem
                        key={nav.name}
                        className={cx('navbar-btn', { active: navActive === index, 'navbar-btn--active': openPopperNotify && navActive === index })}
                        onClick={(e) => {
                            handleNavClick(index);
                            if (nav?.onClick) {
                                nav.onClick(e);
                            }
                        }}
                        component={nav.path ? Link : 'div'}
                        to={nav.path || ''}
                    >
                        <ListItemIcon className='relative'>
                            {nav.icon}
                            <RenderWithCondition condition={nav?.name === 'Thông báo' && notifies.length > 0}>
                                <div className="absolute bottom-1/3 left-4 h-6 w-6 rounded-full bg-zinc-500 flex items-center justify-center text-white text-sm">
                                    {notifies.length > 99 ? '99+' : notifies.length !== 0 && notifies.length}
                                </div>
                            </RenderWithCondition>
                        </ListItemIcon>
                        <RenderWithCondition condition={!openPopperNotify}>
                            <ListItemText
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'none',
                                        lg: 'block'
                                    }
                                }}>
                                {nav.name}

                            </ListItemText>

                        </RenderWithCondition>
                        <RenderWithCondition condition={nav.popper}>
                            <Popper open={openPopperNotify} anchorEl={anchorElPopper} transition placement='right'>
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={0}>
                                        <MenuList
                                            sx={{
                                                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                                maxWidth: '400px',
                                                width: '400px',
                                                marginLeft: '10px',
                                                marginBottom: '10px',
                                                zIndex: 1000,
                                                backgroundColor: '#fff',
                                                minHeight: '300px',
                                                border: '1px solid #dbdbdb',
                                                borderRadius: '5px',
                                            }}
                                        >
                                            {nav?.popper}
                                        </MenuList>
                                    </Fade>
                                )}
                            </Popper>
                        </RenderWithCondition>
                    </MenuItem>

                ))}

            </MenuList>

            <Divider sx={{ marginTop: '10px' }} />

            <MenuItem
                sx={{
                    width: {
                        lg: '224px'
                    }
                }}
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '0px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={handleItemMoreActionClick}
                className={cx('navbar-btn')}
            >
                <ListItemIcon>
                    <MenuIcon />
                </ListItemIcon>
                <ListItemText
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'none',
                            lg: 'block'
                        }
                    }}>
                    Xem thêm
                </ListItemText>

                <Popper open={openMoreAction} anchorEl={anchorElMoreAction} transition placement='top-end'>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <MenuList
                                sx={{
                                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                    minWidth: '260px',
                                    marginLeft: '10px',
                                    marginBottom: '10px',
                                    zIndex: 1000,
                                    backgroundColor: '#fff',
                                }}
                            >
                                {moreActions.map((action) => (
                                    <React.Fragment key={action.name}>
                                        {action.isDivider && <Divider />}
                                        <MenuItem
                                            className={cx('navbar-btn')}
                                            component={Link}
                                            to={action.path}
                                            onClick={action?.onClick}
                                        >
                                            <ListItemIcon>{action.icon}</ListItemIcon>
                                            <ListItemText>{action.name}</ListItemText>
                                        </MenuItem>
                                    </React.Fragment>
                                ))}
                            </MenuList>
                        </Fade>
                    )}
                </Popper>
            </MenuItem>
        </Paper >
    );
}

export default Navigation;
