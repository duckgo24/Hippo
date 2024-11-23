import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Modal, Popper, Tab, Tabs, Link, } from "@mui/material";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { fetchGetMyPosts } from "../../redux/slice/post.slice";
import Alert from "../../components/Alert";
import { TickIcon } from "../../components/SgvIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAddFriend, fetchCheckFriend, fetchDeleteFriend, fetchGetAllFriend, } from "../../redux/slice/friend.slice";
import { fetchCreateRequestFriend, fetchDeleteRequestFriend, fetchFindRequestFriendWithReceiver, fetchFindRequestFriendWithSender, fetchRefuseRequestFriend, } from "../../redux/slice/request-friend.slice";
import RenderWithCondition from "../../components/RenderWithCondition";
import CardUser from "../../components/CardUser";
import testImage from "../../images/test.jpg";
import { fetchCreateRoom } from "../../redux/slice/room.slice";
import Post from "../../components/post_component/Post";
import BoxInfoUser from "../../components/BoxInfoUser";
import { useSocket } from "../../providers/socket.provider";
import { fetchCreateNotify } from "../../redux/slice/notify.slice";

function TabPanel({ value, index, children }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function Profile() {
    const { my_account, status_account } = useSelector(state => state.account);
    const { filter_posts } = useSelector(state => state.post);
    const { get_friend, friends } = useSelector(state => state.friend);
    const { get_request_friend_sender, get_request_friend_receiver } = useSelector(state => state.requestFriend);
    const [currentTab, setCurrentTab] = useState(0);
    const [openModalEditProfile, setOpenModalEditProfile] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useSocket();

    const { state } = useLocation();

    const [anchorElOptionFriend, setAnchorElOptionFriend] = useState(null);
    const [openOptionFriend, setOpenOptionFriend] = useState(false);

    const toggleOptionFriend = (e) => {
        setOpenOptionFriend(prev => !prev)
        setAnchorElOptionFriend(e.currentTarget);
    }


    const currentAccount = useMemo(() => {
        return state?.account ? state?.account : my_account;
    }, [state?.account, my_account]);

    const handleChangeTab = (e, tab) => {
        setCurrentTab(tab);
    };



    const handleToggleModalExitProfile = () => {
        setOpenModalEditProfile(!openModalEditProfile);
    }

    const handleSendRequestFriend = () => {
        dispatch(fetchCreateRequestFriend({
            acc_id: my_account?.id,
            receiver_id: currentAccount?.id
        }))
        socket.emit('send-notify', {
            senderId: my_account?.id,
            receiverId: currentAccount?.id,
            data: {
                message: `${my_account?.full_name} vừa gửi lời mời kết bạn`,
            }
        })
        dispatch(fetchCreateNotify({
            sender_id: my_account?.id,
            receiver_id: currentAccount?.id,
            title: 'Thông báo kết bạn',
            content: `${my_account?.full_name} đã gửi lời mời kết bạn`,
            link: `/profile/${currentAccount?.nickname}`,
            type: 'request_friend',
            isRead: false,
        }))
    }

    const handleDeleteFriend = () => {
        dispatch(fetchDeleteFriend({
            acc_id: my_account?.id,
            friend_id: currentAccount?.id
        }))
    }

    const handleConfirmAddFriend = () => {
        dispatch(fetchAddFriend({
            acc_id: my_account?.id,
            friend_id: currentAccount?.id,
            status: 'friend'
        }))

        dispatch(fetchDeleteRequestFriend({
            acc_id: currentAccount?.id,
            receiver_id: my_account?.id
        }))

        dispatch(fetchCreateRoom({
            room_id: `${my_account?.id}-${currentAccount?.id}`,
            acc_id: my_account?.id,
            friend_id: currentAccount?.id
        }))
    }

    const handleDeleteRequestFriend = () => {
        dispatch(fetchDeleteRequestFriend({
            acc_id: my_account?.id,
            receiver_id: currentAccount?.id
        }))
    }

    const handleRefuseRequestFriend = () => {
        dispatch(fetchRefuseRequestFriend({
            sender_id: currentAccount?.id,
            receiver_id: my_account?.id
        }))
    }

    const handleSendBlockUser = () => {
        navigate('/chat', {
            state: {
                account: currentAccount
            }
        })
    }

    const handleOnChatFriend = () => {
        navigate('/chat', {
            state: {
                account: currentAccount
            }
        })
    }


    const handleClickFriendCard = (friend) => {
        navigate(`/profile/${friend?.nickname}`, {
            state: {
                account: friend
            }
        })
    }



    useEffect(() => {
        if (currentAccount) {
            if (currentTab === 0) {
                if (currentAccount?.id !== filter_posts[0]?.accounts?.id) {
                    dispatch(fetchGetMyPosts({
                        acc_id: currentAccount?.id
                    }));
                }
            }
        }
    }, [currentTab]);

    useEffect(() => {
        if (my_account?.id !== currentAccount?.id) {
            dispatch(fetchCheckFriend({
                acc_id: my_account?.id,
                friend_id: currentAccount?.id
            }))

            if (!get_friend?.friend_id) {
                dispatch(fetchFindRequestFriendWithSender({
                    sender_id: my_account?.id,
                    receiver_id: currentAccount?.id
                }))

                dispatch(fetchFindRequestFriendWithReceiver({
                    sender_id: currentAccount?.id,
                    receiver_id: my_account?.id
                }))
            }
        }
    }, [])

    useEffect(() => {
        dispatch(fetchGetAllFriend({
            acc_id: currentAccount?.id,
            limit: 9
        }))
    }, [currentAccount])

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="60%"
            minHeight="100%"
            margin="auto"
            padding="40px 0 0 0"
            gap="20px"
            position="relative"
        >
            <Paragraph
                size="16px"
                bold="700"
                style={{
                    textAlign: "center",
                }}
            >
                Trang cá nhân
            </Paragraph>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    border: "1px solid #dbdbdb",
                    borderRadius: "10px",
                    padding: "25px",
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px",
                        }}
                    >
                        <Box flex={1}>
                            <Paragraph size="26px" bold="700" color="#000">
                                {currentAccount?.full_name}
                            </Paragraph>
                            <Paragraph color="rgba(0, 0, 0, 0.8)">
                                {currentAccount?.nickname}
                                {currentAccount?.tick && <TickIcon />}
                            </Paragraph>
                            <Paragraph
                                color="rgba(0, 0, 0, 0.8)"
                                style={{
                                    padding: "15px 0",
                                }}
                            >
                                {currentAccount?.bio}
                            </Paragraph>
                            <Paragraph size="14px" color="rgba(0, 0, 0, 0.8)">
                                81.4K người theo dõi
                            </Paragraph>
                        </Box>
                        <Avatar
                            src={currentAccount?.avatar}
                            alt={currentAccount?.nickname}
                            sx={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                    {currentAccount?.id === my_account?.id && (
                        <>
                            <Box
                                display="flex"
                                gap="20px"
                            >
                                <Button
                                    large
                                    style={{
                                        border: "1px solid #dbdbdb",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }}
                                    onClick={handleToggleModalExitProfile}
                                >
                                    Chỉnh sửa trang cá nhân
                                </Button>
                                <Button
                                    large
                                    style={{
                                        border: "1px solid #dbdbdb",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }}
                                    onClick={handleToggleModalExitProfile}
                                >
                                    Cài đặt
                                </Button>
                            </Box>
                            <Modal
                                open={openModalEditProfile}
                                onClose={() => setOpenModalEditProfile(false)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <BoxInfoUser account={my_account} onChangeInfo={() => setOpenModalEditProfile(false)} />
                            </Modal>
                        </>
                    )}
                    {currentAccount?.id !== my_account?.id && (
                        <Box display="flex" justifyContent="space-between" gap="20px">
                            <RenderWithCondition
                                condition={
                                    !get_request_friend_sender?.sender_id && !get_request_friend_receiver?.receiver_id
                                    &&
                                    !get_friend?.friend_id
                                }
                            >
                                <Button
                                    large
                                    style={{
                                        color: "white",
                                        border: "1px solid #dbdbdb",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        backgroundColor: "#000000",
                                    }}
                                    onClick={handleSendRequestFriend}
                                >
                                    Kết bạn
                                </Button>
                            </RenderWithCondition>

                            <RenderWithCondition
                                condition={
                                    get_request_friend_receiver?.sender_id === currentAccount?.id
                                    && get_request_friend_receiver?.status === 'pending'
                                }
                            >
                                <Button
                                    large
                                    style={{
                                        color: "white",
                                        border: "1px solid #dbdbdb",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        backgroundColor: "#000000",
                                    }}
                                    onClick={handleConfirmAddFriend}
                                >
                                    Đồng ý
                                </Button>
                            </RenderWithCondition>
                            <RenderWithCondition
                                condition={
                                    get_request_friend_receiver?.sender_id === currentAccount?.id
                                    && get_request_friend_receiver?.status === 'pending'
                                }
                            >
                                <Button
                                    large
                                    style={{
                                        color: "white",
                                        border: "1px solid #dbdbdb",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    }}
                                    onClick={handleRefuseRequestFriend}
                                >
                                    Không chấp nhận
                                </Button>
                            </RenderWithCondition>

                            <RenderWithCondition
                                condition={
                                    get_request_friend_sender?.sender_id === my_account?.id &&
                                    get_request_friend_sender?.status === 'pending'
                                }
                            >
                                <Button
                                    large
                                    style={{
                                        color: "white",
                                        border: "1px solid #dbdbdb",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        backgroundColor: "#000000",
                                    }}
                                    onClick={handleDeleteRequestFriend}
                                >
                                    Hủy lời mời
                                </Button>
                            </RenderWithCondition>

                            <RenderWithCondition condition={get_friend && get_friend?.status === 'friend'}>
                                <Button
                                    large
                                    style={{
                                        color: "white",
                                        border: "1px solid #dbdbdb",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        backgroundColor: "#000000",
                                    }}
                                    onClick={toggleOptionFriend}
                                >
                                    Bạn bè
                                </Button>
                                <Popper
                                    open={openOptionFriend}
                                    anchorEl={anchorElOptionFriend}
                                >
                                    <Box
                                        position='absolute'
                                        top="0"
                                        left="0"
                                        minWidth="200px"
                                        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                        backgroundColor="rgba(0, 0, 0, 0.8)"
                                        borderRadius="8px"
                                        display='flex'
                                        flexDirection='column'
                                        zIndex="9999"
                                    >
                                        <Button
                                            onClick={handleOnChatFriend}
                                            style={{
                                                fontSize: "16px",
                                                padding: "8px 30px",
                                                color: "#fff"
                                            }}>
                                            Nhắn tin
                                        </Button>
                                        <Button onClick={handleDeleteFriend} style={{
                                            fontSize: "16px",
                                            padding: "8px 30px",
                                            color: "#fff"
                                        }}>
                                            Huỷ kết bạn
                                        </Button>
                                        <Button onClick={handleDeleteFriend} style={{
                                            fontSize: "16px",
                                            padding: "8px 30px",
                                            color: "#fff"
                                        }}>
                                            Theo dõi
                                        </Button>
                                    </Box>
                                </Popper>
                            </RenderWithCondition>




                            <Button
                                onClick={handleSendBlockUser}
                                large
                                style={{
                                    border: "1px solid #dbdbdb",
                                    padding: "10px 20px",
                                    borderRadius: "10px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                Chặn người dùng
                            </Button>
                        </Box>
                    )}
                </Box>
                <Box
                    padding="0 10px"
                    marginTop="10px"
                >
                    <Paragraph bold="700">Bạn bè</Paragraph>
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(3, 1fr)"
                        marginTop="10px"
                    >
                        {friends && friends.map(friend => (
                            <CardUser
                                onClick={() => handleClickFriendCard(friend.friend)}
                                key={friend?.id} nickname={friend?.friend?.nickname} name={friend?.friend?.full_name} tick={friend?.friend?.tick}
                                avatar={friend?.friend?.avatar}
                            />
                        ))}
                        {
                            [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                                <CardUser onClick={handleClickFriendCard} key={index} nickname={"Test21"} name={"Nguoi dung 21"} tick={item % 2 || null}
                                    avatar={testImage}
                                />
                            ))
                        }
                    </Box>
                    <Link
                        href={`/${currentAccount?.nickname}/friends`}
                        sx={{
                            fontSize: "14px",
                            textDecoration: "none",
                            fontWeight: "500",
                            padding: "5px 0",
                            display: "block",
                            width: "100%",
                            textAlign: "center",
                            marginTop: "10px",
                            ':hover': {
                                cursor: "pointer",
                                textDecoration: "underline",
                            }
                        }}
                    >Xem tất cả</Link>
                </Box>


                <Tabs
                    value={currentTab}
                    onChange={handleChangeTab}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#000",
                            color: "#000"
                        },
                    }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                        mb: 2,
                        '.MuiTab-root': {
                            color: 'rgba(0, 0, 0, 0.5)',
                            flex: 1,
                        },
                        '.Mui-selected': {
                            color: '#000000 !important',
                        },
                    }}
                >
                    <Tab label="Bài viết" />
                    <Tab label="Video" />
                    <Tab label="Đã thích" />
                </Tabs>

                <TabPanel
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                    }}
                    value={currentTab} index={0}
                >
                    {
                        !filter_posts
                            ?
                            <Paragraph>Chưa có bài viết nào</Paragraph>
                            :
                            filter_posts.map(post => (
                                <Post post={post} key={post.post_id} style={{
                                    width: "100%",
                                    maxWidth: "100%",
                                }} />
                            ))
                    }
                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                    Video
                </TabPanel>
                <TabPanel value={currentTab} index={2}>
                    Đã thích
                </TabPanel>
            </Box>

            <RenderWithCondition condition={status_account === 'succeeded' && !openModalEditProfile}>
                <Alert type={'success'} message={"Cap nhat tai khoan thanh cong"} title={"Thong bao"} />
            </RenderWithCondition>



        </Box>
    );
}

export default Profile;
