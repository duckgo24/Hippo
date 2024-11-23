import React, { useEffect, useState } from 'react';
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
    UserIcon, ReportIcon,
    ChangeIcon,
    LogOutIcon
} from '../../SgvIcon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteNotify, fetchGetAllNotify } from '../../../redux/slice/notify.slice';
import ListNotify from '../../notify_component/ListNotify';
import logo from '../../../images/logo.png';
import { useSocket } from '../../../providers/socket.provider';

const cx = classNames.bind(styles);




function Navigation() {
    const [openMoreAction, setOpenMoreAction] = useState(false);
    const [openPopperNotify, setOpenPopperNotify] = useState(false);
    const [anchorElMoreAction, setAnchorElMoreAction] = useState(null);
    const [anchorElPopper, setAnchorElPopper] = useState(null);
    const [navActive, setNavActive] = useState(0);
    const { my_account } = useSelector(state => state.account);
    const { notifies } = useSelector(state => state.notify);
    const [numNotifies, setNumNotifies] = useState(notifies?.length || 0);
    const socket = useSocket();
    const dispatch = useDispatch();
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
            popper: <ListNotify listNotify={notifies} />,
        },

        {
            path: '/sell',
            name: 'Mua hàng',
            icon: <PlusIcon />,
            isActive: false,
        },
        {
            name: 'Trang cá nhân',
            icon: <img src={my_account?.avatar} style={{ height: 35, width: 35 }} />,
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

    useEffect(() => {
        socket.on('receive-notify', async (response) => {
            const notifyData = response.data;
            setNumNotifies(prev => prev + 1);
            
            if (notifyData?.type === 'dislike' || notifyData?.type === 'del-comment') {
                console.log('notifyData', notifyData);
                
                const matchingNotifies = notifies.filter(notify => 
                    notify.content === notifyData.content &&
                    notify.sender_id === notifyData.sender_id &&
                    notify.receiver_id === notifyData.receiver_id
                );
    
                if (matchingNotifies.length > 0) {
                    for (const notify of matchingNotifies) {
                        await dispatch(fetchDeleteNotify({ notify_id: notify.notify_id }));
                        setNumNotifies(prev => prev - 1);
                    }
                    await dispatch(fetchGetAllNotify({ acc_id: my_account?.id }));
                }
            } else {
                await dispatch(fetchGetAllNotify({ acc_id: my_account?.id }));
            }
        });
    
        return () => {
            socket.off('receive-notify');
        };
    }, [socket, notifies, dispatch, my_account]);
    

    useEffect(() => {
        if (openPopperNotify) {
            dispatch(fetchGetAllNotify({
                acc_id: my_account?.id,
            }))
        }
    }, [openPopperNotify]);






    return (
        <Paper className={cx('navbar', {
            // 'navbar-active-popper': openPopperNotify,
            'navbar-inactive-popper': !openPopperNotify,
        })}>
            <MenuList>
                <MenuItem className={cx('navbar-btn')} style={{ height: '150px' }}>
                    <RenderWithCondition condition={!openPopperNotify}>
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
                    </RenderWithCondition>
                    <RenderWithCondition condition={openPopperNotify}>
                        <img src={logo} style={{ height: 50, width: 50, borderRadius: '50%', marginLeft: '-8px' }} />
                    </RenderWithCondition>
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
                        <ListItemIcon>{nav.icon}</ListItemIcon>
                        <RenderWithCondition condition={!openPopperNotify}>
                            <ListItemText style={{
                                position: 'relative',
                            }}>
                                {nav.name}

                                <RenderWithCondition condition={nav?.name === 'Thông báo' && numNotifies > 0}>
                                    <Box
                                        position='absolute'
                                        bottom='35%'
                                        left='-18px'
                                        height='25px'
                                        width='25px'
                                        borderRadius='50%'
                                        backgroundColor='#DFF2EB'
                                        display='flex'
                                        justifyContent='center'
                                        alignItems='center'
                                        fontSize='14px'
                                    >
                                        {numNotifies > 99 ? '99+' : numNotifies !== 0 && numNotifies}
                                    </Box>
                                </RenderWithCondition>
                            </ListItemText>

                        </RenderWithCondition>
                        <RenderWithCondition condition={nav.popper}>
                            <Popper open={openPopperNotify} anchorEl={anchorElPopper} transition placement='right'>
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={500}>
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
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '250px',
                }}
                onClick={handleItemMoreActionClick}
                className={cx('navbar-btn')}
            >
                <ListItemIcon>
                    <MenuIcon />
                </ListItemIcon>
                <RenderWithCondition condition={!openPopperNotify}>
                    <ListItemText>Xem thêm</ListItemText>
                </RenderWithCondition>

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
