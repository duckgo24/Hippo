import { Box, Divider, Modal, Popover, Popper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardUser from '../../CardUser';
import { BlockIcon, CloseIcon, DeleteIcon, HealIcon, MessageIcon, MoreIcon, ShareIcon } from '../../SgvIcon';
import Paragraph from '../../Paragraph';
import CommentList from '../../comment_component/CommentList';
import RenderWithCondition from '../../RenderWithCondition';
import { setComment } from '../../../redux/slice/comment.slice';
import handleTime from '../../../utils/handleTime';
import { fetchBlockPost } from '../../../redux/slice/block-post.slice';
import { useSocket } from '../../../providers/socket.provider';
import { useNavigate } from 'react-router-dom';
import Alert from '../../Alert';
import { useQuery } from '@tanstack/react-query';
import { commentService } from '../../../services/CommentService';
import Loading from '../../Loading';
import { notifyService } from '../../../services/NotifyService';
import useHookMutation from '../../../hooks/useHookMutation';
import { setLikePost } from '../../../redux/slice/like.slice';
import { likeService } from '../../../services/LikeService';
import { setDeletePost, setUpdatePost } from '../../../redux/slice/post.slice';
import { postService } from '../../../services/PostService';
import { fetchCreateNotify, fetchDeleteNotify, fetchDeleteNotify2 } from '../../../redux/slice/notify.slice';
import { videoService } from '../../../services/VideoService';
import DeletePost from '../DeletePost';

function Post({ post, openComment, onToggleComments, onDeletePost }) {
    const { my_account } = useSelector((state) => state.account);
    const { comments } = useSelector((state) => state.comment);
    const { like_posts } = useSelector((state) => state.like);
    const [activeHealIcon, setActiveHealIcon] = useState(
        post?.likes?.some((like) => like.acc_id === my_account?.acc_id),
    );
    const [anchorElComment, setAnchorElComment] = useState(null);
    const [anchorElOptionPost, setAnchorElOptionPost] = useState(null);
    const [openModalDeletePost, setOpenModalDeletePost] = useState(false);
    const [isShare, setIsShare] = useState(false);

    const socket = useSocket();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        data: commentData,
        isSuccess: isFetchCommentSuccess,
        isLoading: isFetchCommentLoading,
        isError: isFetchCommentError,
    } = useQuery({
        queryKey: ['get-all-comment', post?.post_id && openComment],
        queryFn: () => commentService.getCommentByPostId(post?.post_id),
        enabled: !!post?.post_id && openComment,
    });

    useEffect(() => {
        if (openComment) {
            if (isFetchCommentSuccess) {
                dispatch(setComment(commentData));
            } else if (isFetchCommentError) {
                dispatch(setComment([]));
            }
        }
    }, [openComment, isFetchCommentSuccess, isFetchCommentError, commentData, dispatch]);

    const handleClickPost = () => {
        if (post?.post_id) {
            navigate(`/post/${post?.post_id}`);
        }

        if (post?.video_id) {
            navigate(`/video/${post?.video_id}`);
        }
    };

    const handleToggleComments = (event) => {
        onToggleComments();
        setAnchorElComment(event.currentTarget);
    };

    const handleClickSharePost = () => {
        navigator.clipboard.writeText(`http://localhost:3000/post/${post?.post_id}`);
        setIsShare(true);
    };

    const toggleOptionPost = (e) => {
        setAnchorElOptionPost(anchorElOptionPost ? null : e.currentTarget);
    };

    const updatePostMutation = useHookMutation(({ post_id, data }) => {
        return postService.updatePost(post_id, data);
    });

    const likeMutation = useHookMutation((data) => {
        return likeService.like(data);
    });

    const disLikeMutation = useHookMutation((data) => {
        return likeService.disLike(data);
    });

    const handleClickLike = async () => {
        setActiveHealIcon(!activeHealIcon);

        if (!activeHealIcon) {
            likeMutation.mutate({
                acc_id: my_account?.acc_id,
                post_id: post?.post_id,
                is_like: true,
            });
            updatePostMutation.mutate(
                {
                    post_id: post?.post_id,
                    data: {
                        num_likes: post?.num_likes + 1,
                    },
                },
                {
                    onSuccess: (data) => {
                        dispatch(
                            setUpdatePost({
                                post_id: post?.post_id,
                                num_likes: post?.num_likes + 1,
                            }),
                        );
                        if (post?.accounts?.acc_id !== my_account?.acc_id) {
                            dispatch(
                                fetchCreateNotify({
                                    sender_id: my_account?.acc_id,
                                    receiver_id: post?.accounts?.acc_id,
                                    type: 'like',
                                    isRead: false,
                                    link: `/post/${post?.post_id}`,
                                    title: 'Thông báo',
                                    content: `${my_account?.full_name} đã thích bài viết ${post?.title}`,
                                }),
                            );
                            // notifyService.createNotify({

                            // })
                            socket.emit('send-notify', {
                                receiverId: post?.accounts?.acc_id,
                                data: {
                                    content: `${my_account?.full_name} đã thích bài viết ${post?.title}`,
                                    sender_id: my_account?.acc_id,
                                    receiver_id: post?.accounts?.acc_id,
                                    type: 'like',
                                },
                            });
                        }
                    },
                },
            );
        } else {
            disLikeMutation.mutate({
                acc_id: my_account?.acc_id,
                post_id: post?.post_id,
            });

            updatePostMutation.mutate(
                {
                    post_id: post?.post_id,
                    num_likes: post?.num_likes - 1,
                },
                {
                    onSuccess: () => {
                        dispatch(
                            setUpdatePost({
                                post_id: post?.post_id,
                                num_likes: post?.num_likes - 1,
                            }),
                        );
                        if (post?.accounts?.acc_id !== my_account?.acc_id) {
                            dispatch(
                                fetchDeleteNotify2({
                                    sender_id: my_account?.acc_id,
                                    receiver_id: post?.accounts?.acc_id,
                                    title: 'Thông báo',
                                    content: `${my_account?.full_name} đã thích bài viết ${post?.title}`,
                                }),
                            );
                            // notifyService.createNotify({

                            // })
                            socket.emit('send-notify', {
                                receiverId: post?.accounts?.acc_id,
                                data: {
                                    message: `${my_account?.full_name} đã bỏ thích bài viết ${post?.title}`,
                                    content: `${my_account?.full_name} đã thích bài viết ${post?.title}`,
                                    sender_id: my_account?.acc_id,
                                    receiver_id: post?.accounts?.acc_id,
                                    type: 'dislike',
                                },
                            });
                        }
                    },
                },
            );
        }

        // dispatch(fetchDislikesPost({
        //     acc_id: my_account?.acc_id,
        //     post_id: post?.post_id,
        // }));

        // dispatch(fetchUpdatePost({
        //     id: post?.post_id,
        //     num_likes: post?.num_likes - 1,
        // }));
        // if (post?.accounts?.acc_id !== my_account?.acc_id) {
        //     socket.emit('send-notify', {
        //         receiverId: post?.accounts?.acc_id,
        //         data: {
        //             message: `${my_account?.full_name} đã bỏ thích bài viết ${post?.title}`,
        //             content: `${my_account?.full_name} đã thích bài viết ${post?.title}`,
        //             sender_id: my_account?.acc_id,
        //             receiver_id: post?.accounts?.acc_id,
        //             type: '',
        //         }
        //     })
        // }
    };

    const handleDeletePost = () => {
        onDeletePost(post);
    };

    const handleClickBlockPost = () => {
        dispatch(
            setDeletePost({
                post_id: post?.post_id,
            }),
        );
        setAnchorElOptionPost(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            setAnchorElComment(null);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isShare) {
            setTimeout(() => {
                setIsShare(false);
            }, 3000);
        }
    }, [isShare]);

    return (
        <div className="flex flex-col justify-start gap-3 mb-2  py-4 px-5 border border-solid border-gray-300 bg-white rounded-lg shadow-md w-full sm:w-[600px] md:w-[600px] lg:w-[800px]">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <CardUser
                        nickname={post?.accounts?.full_name}
                        tick={post?.accounts?.tick}
                        avatar={post?.accounts?.avatar}
                    />
                </div>

                <button onClick={toggleOptionPost}>
                    <MoreIcon />
                </button>
                <Popover
                    open={anchorElOptionPost}
                    anchorEl={anchorElOptionPost}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    onClose={() => setAnchorElOptionPost(null)}
                >
                    <div className="max-w-52 min-w-28 border border-solid border-black bg-white flex flex-col rounded-lg">
                        <button
                            className="py-1 px-3 flex items-center gap-2 hover:opacity-65"
                            onClick={handleClickBlockPost}
                        >
                            <BlockIcon size={18} />
                            <p>Chặn bài viết</p>
                        </button>
                        <Divider />
                        <RenderWithCondition condition={post?.accounts?.acc_id == my_account?.acc_id}>
                            <button
                                onClick={handleDeletePost}
                                className="py-1 px-3 flex items-center gap-2 hover:opacity-65"
                            >
                                <DeleteIcon size={14} />
                                <p>Xóa bài viết</p>
                            </button>
                        </RenderWithCondition>
                    </div>
                </Popover>
            </div>
            <Typography variant="body2">{handleTime(post?.createdAt)}</Typography>
            <Typography variant="subtitle2">{post?.title}</Typography>

            <div className="w-full max-h-[600px]" onClick={handleClickPost}>
                <RenderWithCondition condition={post?.image}>
                    <img
                        src={post?.image}
                        alt={post?.title}
                        loading="lazy"
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </RenderWithCondition>
            </div>

            <RenderWithCondition condition={post?.video}>
                <div className="w-full h-[700px]" onClick={handleClickPost}>
                    <video
                        src={post?.video}
                        controls
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </RenderWithCondition>

            <div className="flex justify-between">
                <button
                    className="flex items-center text-slate-800 font-medium text-base gap-2 hover:opacity-50"
                    onClick={handleClickLike}
                >
                    <HealIcon
                        size={23}
                        color={activeHealIcon ? '#f00' : '#000'}
                        style={{
                            stroke: activeHealIcon ? '#f00' : '#000',
                        }}
                        active={activeHealIcon}
                    />
                    <p>{post?.num_likes} lượt thích</p>
                </button>
                <button
                    aria-describedby="open-comment"
                    className="flex items-center text-base gap-2 text-slate-800 font-medium hover:opacity-50"
                    onClick={handleToggleComments}
                >
                    <MessageIcon size={23} />
                    <p> {post?.num_comments} Bình luận </p>
                </button>
                <Popper id="open-comment" open={openComment} anchorEl={anchorElComment} placement="bottom-start">
                    <Box
                        sx={{
                            border: 1,
                            p: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 4,
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            width: 450,
                            maxWidth: '100%',
                            minHeight: '100px',
                            marginLeft: 'auto',
                        }}
                    >
                        <Box
                            position="relative"
                            height={40}
                            display="flex"
                            alignItems="center"
                            gap="10px"
                            padding=" 0 10px"
                        >
                            <button onClick={handleToggleComments}>
                                <CloseIcon size={16} />
                            </button>
                            <Paragraph
                                color="#000"
                                bold="600"
                                style={{
                                    fontSize: '18px',
                                    lineHeight: '20px',
                                    textAlign: 'center',
                                    flex: 1,
                                }}
                            >
                                Bình luận
                            </Paragraph>
                        </Box>
                        <RenderWithCondition condition={openComment && isFetchCommentLoading}>
                            <Loading />
                        </RenderWithCondition>
                        <RenderWithCondition condition={openComment && !isFetchCommentLoading}>
                            <CommentList post={post} comment_list={comments} />
                        </RenderWithCondition>
                    </Box>
                </Popper>
                <button
                    onClick={handleClickSharePost}
                    className="relative flex items-center gap-2 text-slate-800 font-medium hover:opacity-50"
                >
                    <ShareIcon />
                    <p>Chia sẻ</p>
                    {isShare && <Alert type="success" title="Thông báo" message="Sao chép liên kết thành công" />}
                </button>
            </div>
        </div>
    );
}

export default Post;
