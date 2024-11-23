import { Box, Divider, Popper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import CardUser from "../../CardUser";
import { BlockIcon, CloseIcon, DeleteIcon, HealIcon, MessageIcon, MoreIcon, ShareIcon } from "../../SgvIcon";
import Paragraph from "../../Paragraph";
import CommentList from "../../comment_component/CommentList";
import RenderWithCondition from "../../RenderWithCondition";

import { fetchLikePost, fetchDislikesPost } from "../../../redux/slice/like.slice";
import { fetchUpdatePost } from "../../../redux/slice/post.slice";
import { fetchGetAllComments } from "../../../redux/slice/comment.slice";
import handleTime from "../../../utils/handleTime";
import { fetchBlockPost } from "../../../redux/slice/block-post.slice";
import { fetchCreateNotify, fetchDeleteNotify } from "../../../redux/slice/notify.slice";
import { useSocket } from "../../../providers/socket.provider";
import { useNavigate } from "react-router-dom";
import Alert from "../../Alert";


function Post({ post, openComment, onToggleComments, style }) {
    const { my_account } = useSelector(state => state.account);
    const { comments } = useSelector(state => state.comment);
    const [activeHealIcon, setActiveHealIcon] = useState(
        post?.likes?.some(like => like.acc_id === my_account.id)
    );
    const [anchorElComment, setAnchorElComment] = useState(null);
    const [anchorElOptionPost, setAnchorElOptionPost] = useState(null);
    const [openOptionPost, setOpenOptionPost] = useState(false);
    const [isShare, setIsShare] = useState(false);

    const socket = useSocket();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickPost = () => {
        navigate(`/post/${post?.post_id}`, {
            state: {
                post_id: post?.post_id
            }
        });
    }

    const handleToggleComments = (event) => {
        onToggleComments();
        setAnchorElComment(event.currentTarget);
    };

    const handleClickSharePost = () => {
        navigator.clipboard.writeText(`http://localhost:3000/post/${post?.post_id}`);
        setIsShare(true);
    }

    const toggleOptionPost = (e) => {
        setAnchorElOptionPost(anchorElOptionPost ? null : e.currentTarget);
        setOpenOptionPost(!openOptionPost);
    }

    const handleClickLike = () => {
        setActiveHealIcon(!activeHealIcon);
        if (!activeHealIcon) {
            dispatch(fetchLikePost({
                acc_id: my_account.id,
                post_id: post?.post_id,
                is_like: true
            }));

            dispatch(fetchUpdatePost({
                id: post?.post_id,
                num_likes: post?.num_likes + 1,
            }));

            if (post?.accounts?.id !== my_account?.id) {
                dispatch(fetchCreateNotify({
                    sender_id: my_account?.id,
                    receiver_id: post?.accounts?.id,
                    type: "like",
                    isRead: false,
                    link: `/post/${post?.post_id}`,
                    title: "Thông báo",
                    content: `${my_account?.full_name} đã thích bài viết ${post?.title}`,
                }));
                socket.emit('send-notify', {
                    receiverId: post?.accounts?.id,
                    data: {
                        content: `${my_account?.full_name} đã thích bài viết ${post?.title}`,
                        sender_id: my_account?.id,
                        receiver_id: post?.accounts?.id,
                    }
                });
            }

        } else {
            dispatch(fetchDislikesPost({
                acc_id: my_account.id,
                post_id: post?.post_id,
            }));

            dispatch(fetchUpdatePost({
                id: post?.post_id,
                num_likes: post?.num_likes - 1,
            }));
            if (post?.accounts?.id !== my_account?.id) {
                socket.emit('send-notify', {
                    receiverId: post?.accounts?.id,
                    data: {
                        message: `${my_account?.full_name} đã bỏ thích bài viết ${post?.title}`,
                        content: `${my_account?.full_name} đã thích bài viết ${post?.title}`,
                        sender_id: my_account?.id,
                        receiver_id: post?.accounts?.id,
                        type: 'dislike',
                    }
                })
            }
        }
    };

    const handleClickBlockPost = () => {
        dispatch(fetchBlockPost({
            post_id: post?.post_id,
            acc_id: my_account?.id,
        }))
    }

    useEffect(() => {
        if (openComment) {
            dispatch(fetchGetAllComments({
                post_id: post?.post_id,
                acc_id: my_account?.id,
            }));
        }
    }, [openComment]);


    useEffect(() => {
        const handleScroll = () => {
            setAnchorElComment(null);
            setOpenOptionPost(false);
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
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            gap="10px"
            mb={2}
            py={2}
            px={3}
            border="1px solid #ccc"
            borderRadius="5px"
            boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
            backgroundColor="white"
            color="black"
            width="100%"
            sx={{
                '&:hover': {
                    cursor: "pointer"
                },
            }}

        >
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <CardUser nickname={post?.accounts?.nickname} tick={post?.accounts?.tick} avatar={post?.accounts?.avatar} />

                </div>

                <button onClick={toggleOptionPost}>
                    <MoreIcon />
                </button>
                <Popper
                    open={openOptionPost}
                    anchorEl={anchorElOptionPost}
                    placement="bottom"
                >
                    <div className="max-w-52 min-w-28 border border-solid border-black bg-white flex flex-col rounded-lg" >
                        <button
                            onClick={handleClickBlockPost}
                            style={{
                                padding: '5px 10px',
                            }}>
                            <Paragraph color="#000">
                                <BlockIcon size={18} />
                                Chặn bài viết
                            </Paragraph>
                        </button>
                        <Divider />
                        <RenderWithCondition condition={post?.accounts?.id == my_account?.id}>
                            <button style={{
                                padding: '5px 10px',
                            }}
                            >
                                <Paragraph color="#000">
                                    <DeleteIcon size={14} />
                                    Xóa bài viết
                                </Paragraph>
                            </button>
                        </RenderWithCondition>
                    </div>
                </Popper>
            </div>
            <Typography variant="body2">
                {handleTime(post?.createdAt)}
            </Typography>
            <Typography variant="subtitle2">
                {post?.title}
            </Typography>

            <div
                className="w-full"
                style={{
                    height: '500px'
                }}
                onClick={handleClickPost}
            >
                <RenderWithCondition condition={post?.image}>
                    <img src={post?.image} alt={post?.title} loading="lazy" style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                    }} />
                </RenderWithCondition>
                <RenderWithCondition condition={post?.video}>
                    <video src={post?.video} controls style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                    }} />
                </RenderWithCondition>
            </div>

            <div className="flex justify-between">
                <button
                    className="flex items-center text-slate-800 font-medium text-base gap-2 hover:opacity-50"
                    onClick={handleClickLike}
                >
                    <HealIcon
                        size={23}
                        color={activeHealIcon ? "#f00" : "#000"}
                        style={{
                            stroke: activeHealIcon ? "#f00" : "#000"
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
                <Popper
                    id="open-comment"
                    open={openComment}
                    anchorEl={anchorElComment}
                    placement="bottom-start"
                >
                    <Box sx={{
                        border: 1,
                        p: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 4,
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        width: 450,
                        maxWidth: '100%',
                        minHeight: '100px',
                        marginLeft: 'auto',
                    }}>
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
                            <Paragraph color="#000" bold="600" style={{
                                fontSize: '18px',
                                lineHeight: '20px',
                                textAlign: 'center',
                                flex: 1
                            }} >
                                Bình luận
                            </Paragraph>
                        </Box>
                        <RenderWithCondition condition={openComment}>
                            <CommentList post={post} comment_list={comments} />
                        </RenderWithCondition>
                    </Box>
                </Popper>
                <button onClick={handleClickSharePost} className="relative flex items-center gap-2 text-slate-800 font-medium hover:opacity-50">
                    <ShareIcon />
                    <p>Chia sẻ</p>
                    {isShare && <Alert type="success" title="Thông báo" message="Sao chép liên kết thành công" />}
                </button>
            </div>
        </Box>
    );
}

export default Post;
