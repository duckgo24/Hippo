import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

import { Avatar, Box, Modal } from "@mui/material";
import { fetchAuthMe, fetchUpdateAccount, setAuthMe, setUpdateMyAccount } from "../../redux/slice/account.slice";
import { EmojiIcon, ImageIcon, MessageIcon } from "../../components/SgvIcon";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import { setPosts } from "../../redux/slice/post.slice";
import CreatePost from "../../components/post_component/CreatePost";
import Post from "../../components/post_component/Post";
import RenderWithCondition from "../../components/RenderWithCondition";
import { setVideos } from "../../redux/slice/video.slice";
import { useQuery } from "@tanstack/react-query";
import { identityService } from "../../services/IdentityService";
import { postService } from "../../services/PostService";
import { videoService } from "../../services/VideoService";
import useHookMutation from "../../hooks/useHookMutation";
import { accountService } from "../../services/AccountService";
import { friendService } from "../../services/FriendService";
import { setListFriend } from "../../redux/slice/friend.slice";
import { fetchGetAllNotify } from "../../redux/slice/notify.slice";


function Home() {
    const { my_account } = useSelector(state => state.account);
    const { posts } = useSelector(state => state.post);
    const { videos } = useSelector(state => state.video);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [openPostId, setOpenPostId] = useState(null);
    const [message, setMessage] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleShowCreatePost = () => {
        setShowCreatePost(!showCreatePost);
    }

    const handleToggleComments = (postId) => {
        if (openPostId === postId) {
            setOpenPostId(null);
        } else {
            setOpenPostId(postId);
        }
    };

    const { data: authData, isSuccess: isFetchAuthSuccess, isError: isAuthError } = useQuery({
        queryKey: ['auth-me'],
        queryFn: identityService.authMe,
        enabled: !!Cookies.get('access_token'),
    });

    const { data: listPostData, isSuccess: isFetchGetPostsSuccess, isError: isFetchGetPostsError } = useQuery({
        queryKey: ['get-all-post'],
        queryFn: postService.getAllPosts,
    });


    const { data: listVideoData, isSuccess: isFetchGetVideosSuccess, isError: isFetchGetVideosError } = useQuery({
        queryKey: ['get-all-video'],
        queryFn: videoService.getAllVideos,
    });

    const { data: listFriendData, isSuccess: isFetchGetFriendsSuccess } = useQuery({
        queryKey: ['get-all-friend', my_account?.acc_id],
        queryFn: () => friendService.getFriendWithLimitByAccId(my_account?.acc_id, 1000),
        enabled: !!my_account?.acc_id
    })

    const updateAccountMutation = useHookMutation(({ acc_id, data }) => {
        return accountService.UpdateAccount(acc_id, data);
    })


    useEffect(() => {
        if (!Cookies.get('access_token')) {
            navigate('/login')
        }

        if (isFetchAuthSuccess) {

            if(authData?.isBan) {
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                navigate('/login');
                return;
            }


            dispatch(setAuthMe(authData));
            updateAccountMutation.mutate({ acc_id: my_account?.acc_id, data: { isOnline: true } },
                {
                    onSuccess: (data) => {
                        dispatch(setUpdateMyAccount(data));
                    }
                }
            );
        }

        if (isFetchGetPostsSuccess) {
            dispatch(setPosts(listPostData));
        }

        if(isFetchGetPostsError) {
            dispatch(setPosts([]));
        }


        if (isFetchGetVideosSuccess) {
            dispatch(setVideos(listVideoData));
        }

        if(isFetchGetVideosError) {
            dispatch(setVideos([]));
        }

      
        if (isFetchGetFriendsSuccess) {
            dispatch(setListFriend(listFriendData));
        }

        if (isAuthError) {
            navigate('/login')
        }


    }, [isFetchAuthSuccess, isFetchGetPostsSuccess, isFetchGetVideosSuccess, isFetchGetFriendsSuccess, isAuthError]);

    useEffect(() => {
        dispatch(fetchGetAllNotify({ acc_id: my_account?.acc_id }));
    }, [my_account?.acc_id]);


    const videoAndpost = useMemo(() => {
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




    return (
        <div className="flex flex-col mx-auto py-10 h-full w-1/2">
            <Box
                border="1px solid rgba(0, 0, 0, 0.1)"
                padding="18px 24px 10px 24px"
                borderRadius="10px"
                className="bg-white"
            >
                <div className="flex gap-2">
                    <Avatar src={my_account?.avatar}></Avatar>
                    <input onClick={handleShowCreatePost} placeholder={`${my_account?.full_name} ơi, Hãy chia sẻ khoảng khắc thú vị nào ?`} style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '20px',
                        fontSize: '14px',
                        padding: '10px',
                    }} />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <Button leftIcon={<ImageIcon size={20} />}>
                        Ảnh/Video
                    </Button>
                    <Button onClick={handleShowCreatePost} leftIcon={<EmojiIcon size={16} />}>
                        Cảm xúc/Hoạt động
                    </Button>
                    <Button to='/chat' leftIcon={<MessageIcon size={20} />}>
                        Bạn bè
                    </Button>
                </div>

            </Box>

            <div className="flex flex-col items-center justify-center mt-2">
                <RenderWithCondition condition={videoAndpost && videoAndpost.length > 0}>
                    {videoAndpost.map((item, idx) => {
                        if (item == null) {
                            return null;
                        }
                        return (
                            <Post
                                key={idx}
                                post={item}
                                onToggleComments={() => handleToggleComments(item?.post_id)}
                                openComment={openPostId === item?.post_id}
                            />
                        );
                    }
                    )};
                </RenderWithCondition>
            </div>
            <Modal
                open={showCreatePost}
                onClose={() => setShowCreatePost(false)}
            >
                <CreatePost
                    onCloseForm={() => setShowCreatePost(false)}
                    onCreateSuccess={() => {
                        setMessage({ type: 'success', title: 'Thông báo', message: 'Đăng bài thành công' });
                        setTimeout(() => {
                            setMessage(null);
                        }, 3000);
                        setShowCreatePost(false);
                    }}
                />
            </Modal>
            {message && (
                <Alert type={message?.type} title={message?.title} message={message?.message} />
            )}

        </div>
    );
}

export default Home;
