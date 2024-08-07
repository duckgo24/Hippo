import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { Cloud } from '@mui/icons-material';
import Paragraph from '../../paragraph';

import styles from './Navigation.module.scss';
import {
    ActiveIcon, DiscoverIcon, HealIcon,
    HomeIcon, LightIcon, MenuIcon,
    MessageIcon, PlusIcon, ReelsIcon,
    SaveIcon, SearchIcon, SettingIcon,
    UserIcon, ReportIcon,
    ChangeIcon,
    LogOutIcon
}
    from '../../SgvIcon';
import { Link } from 'react-router-dom';
import { Fade, Popper } from '@mui/material';

const cx = classNames.bind(styles);


const ListNavigation = [
    {
        path: '/',
        name: 'Trang chủ',
        icon: <HomeIcon />,
        onClick: () => console.log('List 1'),
        isActive: true,
    },
    {
        path: '/discover',
        name: 'Tìm kiếm',
        icon: <SearchIcon />,
        onClick: () => console.log('List 2'),
        isActive: false,
    },
    {
        path: '/discover',
        name: 'Khám phá',
        icon: <DiscoverIcon />,
        onClick: () => console.log('List 2'),
        isActive: false,
    },
    {
        path: '/reels',
        name: 'Reels',
        icon: <ReelsIcon />,
        onClick: () => console.log('List 3'),
        isActive: false,
    },
    {
        path: '/message',
        name: 'Tin nhắn',
        icon: <MessageIcon />,
        onClick: () => console.log('List 3'),
        isActive: false,
    },
    {
        path: '/notify',
        name: 'Thông báo',
        icon: <HealIcon />,
        onClick: () => console.log('List 4'),
        isActive: false,
    },
    {
        path: '/sell',
        name: 'Mua hàng',
        icon: <PlusIcon />,
        onClick: () => console.log('List 5'),
        isActive: false,
    },
    {
        path: '/profile',
        name: 'Trang cá nhân',
        icon: <UserIcon />,
        onClick: () => console.log('List 5'),
        isActive: false,
    },

]

const moreActions = [
    {
        path: '/setting',
        name: 'Cài đặt',
        icon: <SettingIcon />,
        onClick: () => console.log('List 1'),
    },
    {
        path: '',
        name: 'Hoạt động của bạn',
        icon: <ActiveIcon />,
        onClick: () => console.log('List 1'),
    },
    {
        path: '',
        name: 'Đã lưu',
        icon: <SaveIcon />,
        onClick: () => console.log('List 1'),
    },
    {
        path: '',
        name: 'Chuyển chế độ',
        icon: <LightIcon />,
        onClick: () => console.log('List 1'),
    },
    {
        path: '',
        name: 'Báo cáo',
        icon: <ReportIcon />,
        onClick: () => console.log('List 1'),
    },
    {
        path: '',
        isDiliver: true,
        name: 'Chuyển tài khoản',
        icon: <ChangeIcon />,
        onClick: () => console.log('List 1'),
    },
    {
        path: '',
        isDiliver: true,
        name: 'Đăng xuất',
        icon: <LogOutIcon />,
        onClick: () => console.log('List 1'),
    },

]

function Navigation() {

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    return (
        <Paper sx={{ width: 250, maxWidth: '100%', height: '100%' }}>
            <MenuList>
                <MenuItem className={cx('item')}>
                    <Paragraph
                        text='Hippo'
                        style={{
                            fontFamily: "Edu AU VIC WA NT Hand",
                            fontStyle: "italic",
                            padding: '0 0 20px 0',
                        }}
                        size={40}
                        bold={800}
                    />
                </MenuItem>
                {ListNavigation.map(nav => {
                    return (
                        <MenuItem
                            key={nav?.name}
                            className={cx('item',
                                nav?.isActive ? 'active' : ''
                            )}
                            onClick={nav?.onClick}>
                            <Link to={nav?.path}>
                                <ListItemIcon>
                                    {nav?.icon}
                                </ListItemIcon>
                                <ListItemText>{nav?.name}</ListItemText>
                            </Link>
                        </MenuItem>
                    )
                })}

            </MenuList>

            <Divider style={{
                marginTop: '10px',
            }} />
            <MenuItem style={{
                position: 'fixed',
                bottom: '10px',
                left: '0px',
                display: 'flex',
                alignItems: 'center',
                width: '250px',
            }} onClick={handleClick} className={cx('item')}>
                <ListItemIcon>
                    <MenuIcon />
                </ListItemIcon>
                <ListItemText>Xem thêm</ListItemText>

                <div>
                    <Popper
                        open={open}
                        anchorEl={anchorEl}
                        transition
                        placement='top-end'
                    >
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <MenuList style={{
                                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                    minWidth: '260px',
                                    marginLeft: '10px',
                                    marginBottom: '10px',
                                    zIndex: 1000,
                                    backgroundColor: '#fff'
                                }}>
                                    {moreActions.map(action => {
                                        if (action?.isDiliver) {
                                            return <>
                                                <Divider />
                                                <MenuItem key={action?.name} onClick={action?.onClick} className={cx('item')}>
                                                    <Link to={action?.path}>
                                                        <ListItemIcon>{action?.icon} </ListItemIcon>
                                                        <ListItemText>{action?.name}</ListItemText>
                                                    </Link>
                                                </MenuItem>

                                            </>

                                        } else {

                                            return <MenuItem key={action?.name} onClick={action?.onClick} className={cx('item')}>
                                                <Link to={action?.path}>
                                                    <ListItemIcon>{action?.icon} </ListItemIcon>
                                                    <ListItemText>{action?.name}</ListItemText>
                                                </Link>
                                            </MenuItem>
                                        }
                                    })}

                                </MenuList>
                            </Fade>
                        )}
                    </Popper>
                </div>
            </MenuItem>





        </Paper>
    );
}

export default Navigation;