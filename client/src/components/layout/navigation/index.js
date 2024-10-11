import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link, useNavigate } from 'react-router-dom';
import { Fade, Popper } from '@mui/material';
import Paragraph from '../../Paragraph';

import styles from './Navigation.module.scss';
import {
    ActiveIcon, DiscoverIcon, HealIcon,
    HomeIcon, LightIcon, MenuIcon,
    MessageIcon, PlusIcon, ReelsIcon,
    SaveIcon, SearchIcon, SettingIcon,
    UserIcon, ReportIcon,
    ChangeIcon,
    LogOutIcon
} from '../../SgvIcon';
import { useSelector } from 'react-redux';


const cx = classNames.bind(styles);




function Navigation() {
    const [openMoreAction, setOpenMoreAction] = useState(false);
    const [openNotify, setOpenNotify] = useState(false);
    const [anchorElMoreAction, setAnchorElMoreAction] = useState(null);
    const [anchorElNotify, setAnchorElNotify] = useState(null);
    const [navActive, setNavActive] = useState(0);
    const { my_account } = useSelector(state => state.account)
    const navigate = useNavigate();

    const handleToggleNotify = (event) => {
        if (event) {
            setAnchorElNotify(event.currentTarget);
            setOpenNotify((prevOpen) => !prevOpen);
        }
        console.log(event);
        
    };


    const handleItemMoreActionClick = (event) => {
        setAnchorElMoreAction(event.currentTarget);
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
            onClick: (event) => handleToggleNotify(event),
        },

        {
            path: '/sell',
            name: 'Mua hàng',
            icon: <PlusIcon />,
            isActive: false,
        },
        {
            name: 'Trang cá nhân',
            icon: <UserIcon />,
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
            path: '/logout',
            name: 'Đăng xuất',
            icon: <LogOutIcon />,
            isDivider: true,
        },
    ];




    return (
        <Paper className={cx('navbar')} sx={{ width: 250, maxWidth: '100%', height: '100vh', position: 'fixed', top: '0' }}>
            <MenuList>
                <MenuItem className={cx('item')}>
                    <Paragraph
                        style={{
                            fontFamily: "Edu AU VIC WA NT Hand",
                            fontStyle: "italic",
                            padding: '0 0 20px 0',
                        }}
                        size={40}
                        bold={800}
                    >
                        Hippo
                    </Paragraph>
                </MenuItem>
                {ListNavigation.map((nav, index) => (
                    <MenuItem
                        key={nav.name}
                        className={cx('item', { active: navActive === index })}
                        onClick={() => {
                            handleNavClick(index);
                            if (nav?.onClick) {
                                nav.onClick();
                            }
                        }}
                        component={nav.path ? Link : 'div'}
                        to={nav.path || ''}
                    >
                        <ListItemIcon>{nav.icon}</ListItemIcon>
                        <ListItemText>{nav.name}</ListItemText>
                        <Popper open={openNotify} anchorEl={anchorElNotify} transition placement='top-end'>
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

                                    </MenuList>
                                </Fade>
                            )}
                        </Popper>
                    </MenuItem>

                ))}

            </MenuList>

            <Divider sx={{ marginTop: '10px' }} />
            <MenuItem
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '250px',
                }}
                onClick={handleItemMoreActionClick}
                className={cx('item')}
            >
                <ListItemIcon>
                    <MenuIcon />
                </ListItemIcon>
                <ListItemText>Xem thêm</ListItemText>

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

                                            className={cx('item')}
                                            component={Link}
                                            to={action.path}
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
        </Paper>
    );
}

export default Navigation;
