import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Divider, Modal, Tab, Tabs } from "@mui/material";
import Paragraph from "../../components/Paragraph";
import Button from "../../components/Button";
import { fetchGetMyPosts } from "../../redux/slice/post.slice";
import Post from "../../components/Post";
import Input from "../../components/Input";
import { PlusIcon, SmileFaceIcon } from "../../components/SgvIcon";

function TabPanel({ value, index, children }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function Profile({ account }) {
    const { my_account } = useSelector(state => state.account);
    const { filter_posts, status_post } = useSelector(state => state.post);
    const [currentTab, setCurrentTab] = useState(0);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [openModalExitProfile, setOpenModalExitProfile] = useState(false);
    const dispatch = useDispatch();
    const inputFileAvatarRef = useRef();

    const handleChangeTab = (e, tab) => {
        setCurrentTab(tab);
    };

    const handleChangeAvatar = () => {
        if (inputFileAvatarRef && inputFileAvatarRef.current) {
            inputFileAvatarRef.current.click(); 
        }
    };

    const handleToggleModalExitProfile = () => {
        setOpenModalExitProfile(!openModalExitProfile);
    }
    



    useEffect(() => {
        if (!account) {
            setCurrentAccount(my_account);
        } else {
            setCurrentAccount(account);
        }
    }, [account])

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

    }, [])

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="60%"
            minHeight="100%"
            margin="auto"
            padding="40px 0 0 0"
            gap="20px"
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
                            <Modal
                                open={openModalExitProfile}
                                onClose={() => setOpenModalExitProfile(false)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    width={500}
                                    height={500}
                                    boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                                    bgcolor="#fff"
                                    borderRadius={5}
                                    padding="30px 25px"
                                >

                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                    >
                                        <Box flex={1}>
                                            <label
                                                style={{
                                                    padding: "0 20px",
                                                }}
                                            >Tên người dùng</label>
                                            <Input
                                                leftIcon={<SmileFaceIcon size={30} color="#000" />}
                                                value={currentAccount?.full_name}
                                                style={{
                                                    border: "none",
                                                }}
                                            />
                                            <Divider style={{
                                                backgroundColor: "#000",
                                                height: "2px"
                                            }} />
                                        </Box>
                                        <Box
                                            position="relative"
                                            height="65px"
                                            width="65px"
                                            marginLeft="20px"
                                        >
                                            <Avatar
                                                src={currentAccount?.avatar}
                                                alt={currentAccount?.nickname}
                                                onClick={handleChangeAvatar}
                                                sx={{
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    height: '100%',
                                                    width: '100%',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    ":before": {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        bottom: 0,
                                                        right: 0,

                                                    },
                                                    ":hover:before": {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.45)',
                                                    },


                                                }}
                                            />
                                            <PlusIcon color="rgba(0, 0, 0, 0.45)" style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                            }} />
                                            <input ref={inputFileAvatarRef} type="file" style={{
                                                display: 'none',
                                            }} />
                                        </Box>


                                    </Box>

                                </Box>
                            </Modal>
                        </>
                    )}
                    {currentAccount?.id !== my_account?.id && (
                        <Box display="flex" justifyContent="space-between" gap="20px">
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
                            >
                                Theo dõi
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
                            >
                                Chặn tài khoản
                            </Button>
                        </Box>
                    )}
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

                <TabPanel value={currentTab} index={0}>
                    {
                        !filter_posts
                            ?
                            <Paragraph>Chưa có bài viết nào</Paragraph>
                            :
                            filter_posts.map(post => (
                                <Post post={post} key={post.id} style={{
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
        </Box>
    );
}

export default Profile;
