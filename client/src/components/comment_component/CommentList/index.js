import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextareaAutosize } from "@mui/material";
import EmojiPicker from "emoji-picker-react";

import Comment from "../Comment";
import CardUser from "../../CardUser";
import Loader from "../../Loader";
import { EmojiIcon, SubmitIcon } from "../../SgvIcon";

import { fetchCreateComment, fetchGetAllComments, fetchUpdateComment } from "../../../redux/slice/comment.slice";
import { fetchCreatePost, fetchUpdatePost } from "../../../redux/slice/post.slice";
import { fetchCreateReplyComment } from "../../../redux/slice/reply-comment.slide";
import RenderWithCondition from "../../RenderWithCondition";
import Paragraph from "../../Paragraph";
import { fetchUpdateVideo } from "../../../redux/slice/video.slice";
import { fetchCreateNotify } from "../../../redux/slice/notify.slice";
import { useSocket } from "../../../providers/socket.provider";




function CommentList({ post, video, comment_list, className, style }) {
    const [inputValue, setInputValue] = useState("");
    const [typeSend, setTypeSend] = useState("comment");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [currentCommentReply, setCurrentCommentReply] = useState(null);
    const { my_account } = useSelector(state => state.account);
    const { status_comment } = useSelector(state => state.comment);
    const { status_reply } = useSelector(state => state.replyComment);
    const socket = useSocket();
    const dispatch = useDispatch();
    const forbiddenWords = ["súc vật", "sủa", "đcm"];


    const handleChange = (e) => {
        let value = e.target.value;
        if (value.length > 100) return;

        forbiddenWords.forEach(word => {
            value = value.replace(word, "****");
        });

        setInputValue(value);
        setShowEmojiPicker(false);

        if (!value) setTypeSend("comment");
    };



    const handleSendComment = async () => {
        const tag = inputValue.split(' ').find(word => word.startsWith('@'))?.slice(1);
        if (inputValue.length > 0) {

            await dispatch(fetchCreateComment({
                content: inputValue,
                tag: tag || null,
                num_replies: 0,
                num_likes: 0,
                post_id: post?.post_id,
                video_id: video?.id,
                acc_id: my_account.id,
            }));


            if (post) {
                await dispatch(fetchUpdatePost({
                    id: post?.post_id,
                    num_comments: post.num_comments + 1,
                    acc_id: my_account?.id,
                }));
                await dispatch(fetchGetAllComments({
                    post_id: post?.post_id,
                    acc_id: my_account?.id
                }));


                if (post?.accounts?.id !== my_account?.id) {
                    await dispatch(fetchCreateNotify({
                        sender_id: my_account?.id,
                        receiver_id: post?.accounts?.id,
                        type: "like",
                        isRead: false,
                        link: `/post/${post?.post_id}`,
                        title: "Thông báo",
                        content: `${my_account?.full_name} bình luận "${inputValue}" bài viết ${post?.title}`,
                    }));
                    socket.emit('send-notify', {
                        receiverId: post?.accounts?.id,
                        data: {
                            content: `${my_account?.full_name} bình luận "${inputValue}" bài viết ${post?.title}`,
                            sender_id: my_account?.id,
                            receiver_id: post?.accounts?.id,
                            type: "comment",
                            post_id: post?.post_id,
                        }
                    });
                }
            }

            if (video) {
                await dispatch(fetchUpdateVideo({
                    id: video?.id,
                    num_comments: video?.num_comments + 1,
                    acc_id: my_account?.id,
                }))

                if (video?.accounts?.id !== my_account?.id) {
                    await dispatch(fetchCreateNotify({
                        sender_id: my_account?.id,
                        receiver_id: video?.accounts?.id,
                        type: "like",
                        isRead: false,
                        link: `/video/${video?.id}`,
                        title: "Thông báo",
                        content: `${my_account?.full_name} bình luận "${inputValue}" video ${video?.title}}`,
                    }));
                    socket.emit('send-notify', {
                        receiverId: video?.accounts?.id,
                        data: {
                            content: `${my_account?.full_name} bình luận "${inputValue}" video ${video?.title}}`,
                            sender_id: my_account?.id,
                            receiver_id: video?.accounts?.id,
                            type: "comment",
                            video: video?.id
                        }
                    });
                }
            }

            setInputValue("");
        }

    };

    const handleUpdatePostWhereDelete = async (p) => {
        if (p?.post_id) {
            await dispatch(fetchUpdatePost({
                id: p?.post_id,
                num_comments: p?.num_comments - 1,
            }))
        }

        if (p?.video_id) {
            await dispatch(fetchUpdateVideo({
                id: p?.video_id,
                num_comments: p?.num_comments - 1,
            }))
        }
    }

    const handleSendReplyComment = async () => {
        if (inputValue.length > 0) {
            await dispatch(fetchCreateReplyComment({
                content: inputValue.split(' ').slice(1).join(' '),
                reply_user: currentCommentReply?.accounts?.nickname,
                comment_id: currentCommentReply?.comment_id,
                acc_id: my_account.id,
            }));

            await dispatch(fetchUpdateComment({
                comment_id: currentCommentReply?.comment_id,
                num_replies: currentCommentReply?.num_replies + 1,
            }))

            if (post) {
                await dispatch(fetchUpdatePost({
                    id: post?.post_id,
                    num_comments: post.num_comments + 1,
                }));

                if (currentCommentReply?.accounts?.id !== my_account?.id) {

                    await dispatch(fetchCreateNotify({
                        sender_id: my_account?.id,
                        receiver_id: currentCommentReply?.accounts?.id,
                        type: "reply",
                        isRead: false,
                        link: `/post/${post?.post_id}`,
                        title: "Thông báo",
                        content: `${my_account?.full_name} đã phản hồi với bình luận "${currentCommentReply.content}" của bạn"}`,
                    }));
                    socket.emit('send-notify', {
                        receiverId: currentCommentReply?.accounts?.id,
                        data: {
                            content: `${my_account?.full_name} đã phản hồi với bình luận "${currentCommentReply.content}" của bạn"}`,
                            sender_id: my_account?.id,
                            receiver_id: currentCommentReply?.accounts?.id,
                            post_id: post?.post_id,
                            type: "reply-comment",
                        }
                    });
                }

            }

            if (video) {
                await dispatch(fetchUpdateVideo({
                    id: video?.id,
                    num_comments: video.num_comments + 1,
                }))
            }


            setInputValue("");
            setCurrentCommentReply(null);
        }
    };

    const handleReplyComment = (comment) => {
        setInputValue(`@${comment?.accounts?.nickname} `);
        setTypeSend("reply");
        setCurrentCommentReply(comment);
    };

    const handleOnClickEmoji = (emoji) => {
        setInputValue(prev => prev + emoji.emoji);
        setShowEmojiPicker(false);
    };

    const handleShowEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);
    return (
        <div className={`${className}`}>
            <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                maxHeight="300px"
                minHeight="120px"
                width="100%"
                overflow="auto"
                style={style}
            >
               
                    <RenderWithCondition condition={post?.isComment || video?.isComment}>
                        {comment_list && comment_list.length > 0 && comment_list.map(comment => (
                            <Comment
                                key={comment.comment_id}
                                post_owner={post?.accounts}
                                comment={comment}
                                onReplyComment={() => handleReplyComment(comment)}
                                onUpdatePostWhereDelete={() => handleUpdatePostWhereDelete(post)}
                            />
                        ))}
                    </RenderWithCondition>
               
                <RenderWithCondition condition={comment_list?.length === 0}>
                    <p>Chưa có bình luận nào</p>
                </RenderWithCondition>

                <RenderWithCondition condition={!post?.isComment && !video?.isComment}>
                    <Paragraph color="#000">
                        Nhà sáng tạo đã tắt bình luận
                    </Paragraph>
                </RenderWithCondition>

            </Box>
           <RenderWithCondition condition={post?.isComment || video?.isComment}>
           <Box
                display="flex"
                padding="0 10px"
                justifyContent="space-between"
                alignItems="center"
                gap="5px"
                border='1px solid rgba(0, 0, 0, 0.1)'
                borderRadius='20px'
                position='relative'
            >
                <CardUser avatar={post?.accounts?.avatar || video?.accounts?.avatar} size="26px" style={{ height: "40px" }} />
                <div style={{ flex: 1, position: "relative" }}>
                    <TextareaAutosize
                        style={{
                            width: '100%',
                            fontSize: '14px',
                            border: 'none',
                            outline: 'none',
                            borderRadius: '5px',
                            padding: '0px 8px',
                        }}
                        value={inputValue}
                        onChange={handleChange}
                        disabled={status_comment === 'loading' ||
                            status_reply === 'loading' ||
                            !post?.isComment && !video?.isComment
                        }
                    />
                    <RenderWithCondition
                        condition={status_comment === 'loading'}
                    >
                        <Loader
                            size={10}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '80%',
                                transform: 'translate(0, -50%)',
                                zIndex: 1000,
                            }}
                        />
                    </RenderWithCondition>
                </div>
                <button onClick={handleShowEmojiPicker} disabled={!post?.isComment && !video?.isComment}>
                    <EmojiIcon />
                </button>
                <RenderWithCondition condition={inputValue.length > 0}>
                    <button onClick={typeSend === 'comment' ? handleSendComment : handleSendReplyComment}>
                        <SubmitIcon />
                    </button>
                </RenderWithCondition>

                <EmojiPicker
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: '0',
                        zIndex: 1000,
                        width: '350px',
                        height: '250px',
                    }}
                    searchDisabled
                    suggestedEmojisMode="none"
                    open={showEmojiPicker}
                    onEmojiClick={handleOnClickEmoji}
                    lazyLoadEmojis
                />
            </Box>
           </RenderWithCondition>
        </div>
    );
}

export default CommentList;
