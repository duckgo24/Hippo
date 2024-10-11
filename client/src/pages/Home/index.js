import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'

import { Avatar, Box, Modal } from "@mui/material";
import { fetchAuthMe, fetchUpdateAccount } from "../../redux/slice/account.slice";
import {  EmojiIcon, ImageIcon, MessageIcon } from "../../components/SgvIcon";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import { fetchGetAllPosts } from "../../redux/slice/post.slice";
import { fetchGetAllFriend } from "../../redux/slice/friend.slice";
import CreatePost from "../../components/post_component/CreatePost";
import Post from "../../components/post_component/Post";
import RenderWithCondition from "../../components/RenderWithCondition";
import { fetchGetAllVideos } from "../../redux/slice/video.slice";


function HomeIcon() {
    const { my_account } = useSelector(state => state.account);
    const { status_post, posts } = useSelector(state => state.post);
    const { videos, status_video } = useSelector(state => state.video);
    const { likePosts } = useSelector(state => state.like);
    const { friends } = useSelector(state => state.friend);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [openPostId, setOpenPostId] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleShowCreatePost = () => {
        setShowCreatePost(!showCreatePost);
    }

 
    const handleToggleComments = (postId) => {
        console.log(postId);

        if (openPostId === postId) {
            setOpenPostId(null);
        } else {
            setOpenPostId(postId);
        }
    };

    useEffect(() => {
        if (!Cookies.get('access_token')) {
            if (!Cookies.get('refresh_token')) {
                navigate('/login')
            } else {
                async function a() {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
                        headers: {
                            refresh_cookie: Cookies.get('refresh_token'),
                        },
                        withCredentials: true,
                    })
                    Cookies.set('access_token', res.data.access_token);
                }
                a();
            }
        }

        dispatch(fetchGetAllFriend({ acc_id: my_account?.id }));
        dispatch(fetchAuthMe());
        dispatch(fetchGetAllPosts());
        dispatch(fetchGetAllVideos());
        dispatch(fetchUpdateAccount({
            acc_id: my_account?.id,
            isOnline: true,
            lastOnline: new Date()
        }))
    }, [dispatch]);


    const videoAndpost = useCallback(() => {
        const arr = [];
        var postIndex = 0;
        var videoIndex = 0;
        var postCount = 0;

        if (!posts || !videos || posts.length === 0) return [];

        while (postIndex < posts.length) {
            arr.push(posts[postIndex]);
            postIndex++;
            postCount++;

            if (postCount % 2 === 0 && videoIndex < videos.length) {
                arr.push(videos[videoIndex]);
                videoIndex++;
                postCount = 0;
            }
        }

        return arr;
    }, [videos, posts]);

    // useEffect(() => {
    //     const handleOffline = () => {
    //         SocketService.emit('disconnect', { acc_id: my_account?.id });
    //     };

    //     window.addEventListener('offline', handleOffline);

    //     return () => {
    //         window.removeEventListener('offline', handleOffline);  

    //     };
    // }, [my_account?.id]);


    return (

        <Box
            display="flex"
            flexDirection="column"
            width="550px"
            margin="auto"
            height="100%"
            padding="40px 0"
        >
            <Box
                border="1px solid rgba(0, 0, 0, 0.1)"
                padding="18px 24px 10px 24px"
                borderRadius="10px"
            >
                <Box
                    display="flex"
                    gap="10px"
                >
                    <Avatar src={my_account?.avatar}></Avatar>
                    <input onClick={handleShowCreatePost} placeholder={`${my_account?.full_name} ơi, Hãy chia sẻ khoảng khắc thú vị nào ?`} style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '20px',
                        fontSize: '14px',
                        padding: '10px',
                    }} />
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    mt="10px"
                >
                    <Button leftIcon={<ImageIcon size={20} />}>
                        Ảnh/Video
                    </Button>
                    <Button onClick={handleShowCreatePost} leftIcon={<EmojiIcon size={16} />}>
                        Cảm xúc/Hoạt động
                    </Button>
                    <Button to='/chat' leftIcon={<MessageIcon size={20} />}>
                        Bạn bè
                    </Button>
                </Box>

            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                mt={2}
            >
                {/* {(displayPosts === 'all' ? posts : likePosts)?.map(post => (
                        <Post
                            key={post?.id}
                            post={post}
                            onToggleComments={() => handleToggleComments(post?.id)}
                            openComment={openPostId === post?.id}
                        />
                    ))} */}
                <RenderWithCondition condition={videoAndpost() && videoAndpost().length > 0}>
                    {
                        videoAndpost().map((item) => {
                            return (
                                <Post
                                    key={item.id}
                                    post={item}
                                    onToggleComments={() => handleToggleComments(item.id)}
                                    openComment={openPostId === item.id}
                                />
                            )

                        })
                    }
                </RenderWithCondition>
            </Box>
            <Modal
                open={showCreatePost}
                onClose={() => setShowCreatePost(false)}
            >
                <CreatePost onCloseForm={() => setShowCreatePost(false)} />
            </Modal>
            <RenderWithCondition condition={status_post === 'succeeded'}>
                <Alert type='success' title='Thông báo' message='Đăng bài thành công' />
            </RenderWithCondition>

            <RenderWithCondition condition={status_video === 'succeeded'}>
                <Alert type='success' title='Thông báo' message='Đăng video thành công' />
            </RenderWithCondition>
        </Box>

    );
}

export default HomeIcon;
