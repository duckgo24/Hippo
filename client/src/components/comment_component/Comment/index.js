import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";


import { fetchDeleteComment, fetchUpdateComment } from "../../../redux/slice/comment.slice";
import { fetchDeleteReplyComment, fetchGetAllReplyComment } from "../../../redux/slice/reply-comment.slide";
import Paragraph from "../../Paragraph";
import handleTime from "../../../utils/handleTime";
import RenderWithCondition from "../../RenderWithCondition";
import { HealIcon, TickIcon } from "../../SgvIcon";
import { fetchUpdatePost } from "../../../redux/slice/post.slice";
import { fetchUpdateVideo } from "../../../redux/slice/video.slice";
import { useSocket } from "../../../providers/socket.provider";




function Commemt({ comment, post_owner, onReplyComment, onUpdatePostWhereDelete }) {
    const { my_account } = useSelector(state => state.account)
    const { status_reply, replyComments } = useSelector(state => state.replyComment)
    const [showReply, setShowReply] = useState(false);
    const socket = useSocket();
    const [likeComment, setLikeComment] = useState(false);
    const dispatch = useDispatch();

    const handleLikeComment = () => {
        setLikeComment(!likeComment);
    }


    const handleDeleteComment = async () => {
        await dispatch(fetchDeleteComment({
            comment_id: comment?.comment_id,
            acc_id: my_account?.id,
        }));
        onUpdatePostWhereDelete();

        if (comment?.accounts?.id === my_account?.id) {

            socket.emit('send-notify', {
                receiverId: post_owner?.id,
                data: {
                    message: `${my_account?.full_name} xóa bình luận "${comment?.content}" bài viết ${comment?.posts?.title}`,
                    content: `${my_account?.full_name} bình luận "${comment?.content}" bài viết ${comment?.posts?.title}`,
                    sender_id: my_account?.id,
                    receiver_id: post_owner?.id,
                    type: 'del-comment',
                }
            })
        }


    }

    const handleShowReply = async () => {
        setShowReply((prev) => !prev);
        if (!showReply) {
            if (comment.comment_id !== replyComments[0]?.comment_id)
                await dispatch(fetchGetAllReplyComment({
                    comment_id: comment.comment_id,
                }));
        }
    };


    const handleDeleteReplyComment = async (replyComment) => {
        await dispatch(fetchDeleteReplyComment({
            acc_id: replyComment?.accounts.id,
            id: replyComment?.reply_id
        }))

        await dispatch(fetchUpdateComment({
            comment_id: comment?.comment_id,
            num_replies: comment?.num_replies - 1,
            acc_id: my_account?.id
        }))

        await dispatch(fetchUpdatePost({
            id: comment?.post_id,
            num_comments: (comment?.posts?.num_comments - 1).toString(),
        }))

    }


    return (
        <div>
            <Box
                display='flex'
                flexDirection='row'
                gap='10px'
                justifyContent='space-around'
                maxWidth='90%'
                margin='auto'
            >
                <div>
                    <Avatar src={comment?.accounts?.avatar} alt={comment?.accounts?.nickname} style={{
                        height: "32px",
                        width: "32px",
                    }} />
                </div>
                <div style={{ flex: 1 }} >
                    <Box >
                        <Box
                            display='flex'
                            flexDirection='row'
                            gap='10px'
                        >
                            <Paragraph
                                style={{
                                    display: 'flex',
                                    gap: '5px',
                                    alignItems: 'center'
                                }}
                                bold='500'
                                size='14px'
                                color='#000'
                            >
                                {comment.accounts?.nickname}
                                {comment.accounts?.tick && <TickIcon />}
                            </Paragraph>
                            <Paragraph size='14px' color='#000'>
                                {handleTime(comment.createdAt)}
                            </Paragraph>
                        </Box>
                        <Box>
                            <Box>
                                <Paragraph size='14px' color='#000'>
                                    {comment?.tag && <Link to={`/${comment.tag}`}>@{comment?.tag} </Link>}
                                    {comment?.content}
                                </Paragraph>
                                <Box
                                    display='flex'
                                    flexDirection='row'
                                    gap="10px"
                                >
                                    <Paragraph size='13px' bold="500">
                                        {comment?.num_likes} lượt thích
                                    </Paragraph>
                                    <button onClick={onReplyComment}>
                                        <Paragraph size='13px' bold="500">
                                            Trả lời
                                        </Paragraph>
                                    </button>
                                    {my_account?.id === comment?.accounts?.id
                                        &&
                                        <button onClick={handleDeleteComment}>
                                            <Paragraph size='13px' bold="500">
                                                Xóa
                                            </Paragraph>
                                        </button>
                                    }
                                </Box>
                            </Box>
                            <RenderWithCondition condition={comment?.num_replies > 0}>
                                <button
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}
                                    onClick={handleShowReply}
                                >
                                    <Paragraph size='13px' bold="500">
                                        {!showReply ? `── Xem tất cả ` : `── Ẩn tất cả `} {comment?.num_replies} phản hồi
                                    </Paragraph>
                                </button>

                                <RenderWithCondition condition={showReply}>
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        gap='10px'
                                        marginTop='10px'
                                    >
                                        {replyComments.map((reply) => {
                                            if (reply?.comment_id === comment?.comment_id) {
                                                return (
                                                    <Box
                                                        key={reply?.reply_id}
                                                        display='flex'
                                                        flexDirection='row'
                                                        gap='10px'
                                                        justifyContent='space-around'
                                                    >
                                                        <Avatar
                                                            src={reply.accounts.avatar}
                                                            alt={reply?.accounts?.nickname}
                                                            style={{
                                                                height: "32px",
                                                                width: "32px",
                                                            }}
                                                        />

                                                        <div style={{ flex: 1 }}>
                                                            <Box
                                                                display='flex'
                                                                flexDirection='row'
                                                                gap='10px'
                                                            >
                                                                <Paragraph
                                                                    style={{
                                                                        display: 'flex',
                                                                        gap: '5px',
                                                                        alignItems: 'center'
                                                                    }}
                                                                    bold='500'
                                                                    size='14px'
                                                                    color='#000'
                                                                >
                                                                    {reply?.accounts?.nickname}
                                                                    {reply?.accounts?.tick && <TickIcon />}
                                                                </Paragraph>
                                                                <Paragraph size='14px' color='#000'>
                                                                    {handleTime(reply?.createdAt)}
                                                                </Paragraph>
                                                            </Box>
                                                            <Paragraph size='14px' color='#000'>
                                                                {reply?.reply_user && <Link to={`/${reply?.reply_user}`}>@{reply?.reply_user} </Link>}
                                                                {reply?.content}
                                                            </Paragraph>
                                                        </div>

                                                        <RenderWithCondition condition={my_account?.id === reply?.acc_id}>
                                                            <button onClick={() => handleDeleteReplyComment(reply)}>
                                                                <Paragraph size='14px' color='#000'>
                                                                    xóa
                                                                </Paragraph>
                                                            </button>
                                                        </RenderWithCondition>
                                                    </Box>
                                                );
                                            }
                                        })}
                                    </Box>
                                </RenderWithCondition>
                            </RenderWithCondition>

                        </Box>
                    </Box>
                </div>
                <button onClick={handleLikeComment} style={{
                    maxHeight: '100px'
                }}>
                    <HealIcon size={16} active={likeComment} />
                </button>
            </Box>
        </div>
    );
}

export default Commemt;