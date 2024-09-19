import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextareaAutosize } from "@mui/material";
import EmojiPicker from "emoji-picker-react";

import Comment from "../Comment";
import CardUser from "../../CardUser";
import Loader from "../../Loader";
import { EmojiIcon, SubmitIcon } from "../../SgvIcon";

import { fetchCreateComment, fetchUpdateComment } from "../../../redux/slice/comment.slice";
import { fetchUpdatePost } from "../../../redux/slice/post.slice";
import { fetchCreateReplyComment } from "../../../redux/slice/reply-comment.slide";




function CommentList({ post, video, comment_list }) {
    const [inputValue, setInputValue] = useState("");
    const [typeSend, setTypeSend] = useState("comment");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [currentCommentReply, setCurrentCommentReply] = useState(null);

    const { my_account } = useSelector(state => state.account);
    const { status_comment } = useSelector(state => state.comment);
    const { status_reply } = useSelector(state => state.replyComment);

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

    const handleSendComment = () => {
        const tag = inputValue.split(' ').find(word => word.startsWith('@'))?.slice(1);
        if (inputValue.length > 0) {
            dispatch(fetchCreateComment({
                content: inputValue,
                tag: tag || null,
                num_replies: 0,
                num_likes: 0,
                post_id: post?.id,
                video_id: video?.id,
                acc_id: my_account.id,
            }));

            dispatch(fetchUpdatePost({
                id: post?.id,
                num_comments: post.num_comments + 1,
            }))
            setInputValue("");
        }

    };

    const handleSendReplyComment = () => {
        if (inputValue.length > 0) {
            dispatch(fetchCreateReplyComment({
                content: inputValue.split(' ').slice(1).join(' '),
                reply_user: currentCommentReply?.accounts?.nickname,
                comment_id: currentCommentReply?.comment_id,
                acc_id: my_account.id,
            }));
            dispatch(fetchUpdateComment({
                comment_id: currentCommentReply?.comment_id,
                num_replies: currentCommentReply?.num_replies + 1,
            }))
            setInputValue("");
            setCurrentCommentReply("comment");
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
        <Box>
            <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                maxHeight="300px"
                minHeight="120px"
                width="100%"
                
            >
                {comment_list && comment_list.map(comment => (
                    <Comment
                        key={comment.comment_id}
                        comment={comment}
                        handleReplyComment={() => handleReplyComment(comment)}
                    />
                ))}
            </Box>
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
                <CardUser avatar={post?.accounts?.avatar} size="26px" style={{ height: "40px" }} />
                <div style={{ flex: 1, position: "relative" }}>
                    <TextareaAutosize
                        style={{
                            width: '100%',
                            fontSize: '14px',
                            border: 'none',
                            outline: 'none',
                            borderRadius: '5px',
                            padding: '4px 8px',
                        }}
                        value={inputValue}
                        onChange={handleChange}
                        disabled={status_comment === 'loading' || status_reply === 'loading'}
                    />
                    {(status_comment === 'loading' || status_reply === 'loading') && (
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
                    )}
                </div>
                <button onClick={handleShowEmojiPicker}>
                    <EmojiIcon />
                </button>
                {inputValue.length > 0 && (
                    <button onClick={typeSend === 'comment' ? handleSendComment : handleSendReplyComment}>
                        <SubmitIcon />
                    </button>
                )}
                <EmojiPicker
                    style={{
                        position: 'absolute',
                        top: '-200%',
                        left: '100%',
                        zIndex: 1000,
                        width: '300px',
                        height: '250px',
                    }}
                    searchDisabled
                    suggestedEmojisMode="none"
                    open={showEmojiPicker}
                    onEmojiClick={handleOnClickEmoji}
                    lazyLoadEmojis
                />
            </Box>
        </Box>
    );
}

export default CommentList;
