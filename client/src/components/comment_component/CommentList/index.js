import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Popper, TextareaAutosize } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';

import Comment from '../Comment';
import CardUser from '../../CardUser';
import Loader from '../../Loader';
import { EmojiIcon, SubmitIcon } from '../../SgvIcon';

import { setCreateComment, setUpdateComment } from '../../../redux/slice/comment.slice';
import { setCreateReplyComment } from '../../../redux/slice/reply-comment.slide';
import RenderWithCondition from '../../RenderWithCondition';
import Paragraph from '../../Paragraph';
import { setUpdateVideo } from '../../../redux/slice/video.slice';
import { useSocket } from '../../../providers/socket.provider';
import useHookMutation from '../../../hooks/useHookMutation';
import { postService } from '../../../services/PostService';
import { commentService } from '../../../services/CommentService';
import { setUpdatePost } from '../../../redux/slice/post.slice';
import { videoService } from '../../../services/VideoService';
import { notifyService } from '../../../services/NotifyService';
import { replyCommentService } from '../../../services/ReplyCommentService';
import { fetchCreateNotify, fetchDeleteNotify2 } from '../../../redux/slice/notify.slice';

function CommentList({ post, video, comment_list, className, style }) {
    const [inputValue, setInputValue] = useState('');
    const [typeSend, setTypeSend] = useState('comment');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [currentCommentReply, setCurrentCommentReply] = useState(null);

    const { my_account } = useSelector((state) => state.account);
    const socket = useSocket();
    const dispatch = useDispatch();
    const forbiddenWords = ['đéo', 'méo'];

    const [archerEmojiPicker, setArcherEmojiPicker] = useState(null);

    const accountsCommented = useMemo(() => {
        return Array.from(new Set(comment_list?.map((comment) => comment.accounts.acc_id)));
    }, [comment_list]);

    useEffect(() => {
        console.log(accountsCommented);
    }, [accountsCommented]);

    const handleShowEmojiPicker = (e) => {
        setShowEmojiPicker((prev) => !prev);
        setArcherEmojiPicker(e.currentTarget);
    };

    const handleChangeCommentInput = (e) => {
        let value = e.target.value;
        if (value.length > 100) return;

        forbiddenWords.forEach((word) => {
            value = value.replace(word, '****');
        });

        setInputValue(value);
        setShowEmojiPicker(false);

        if (!value) setTypeSend('comment');
    };

    const updatePostMutation = useHookMutation(({ post_id, data }) => {
        return postService.updatePost(post_id, data);
    });

    const updateVideoMutation = useHookMutation(({ video_id, data }) => {
        return videoService.updateVideo(video_id, data);
    });

    const createCommentMutation = useHookMutation((data) => {
        return commentService.createComment(data);
    });

    const { isPending: isFetchCreateCommentLoading } = createCommentMutation;

    const handleSendComment = async () => {
        const tag = inputValue
            .split(' ')
            .find((word) => word.startsWith('@'))
            ?.slice(1);
        if (inputValue.length > 0) {
            createCommentMutation.mutate(
                {
                    content: inputValue,
                    tag: tag || null,
                    num_replies: 0,
                    num_likes: 0,
                    post_id: post?.post_id,
                    video_id: video?.video_id,
                    acc_id: my_account?.acc_id,
                },
                {
                    onSuccess: (data) => {
                        if (data?.post_id) {
                            updatePostMutation.mutate(
                                {
                                    post_id: post?.post_id,
                                    data: {
                                        num_comments: post.num_comments + 1,
                                    },
                                },
                                {
                                    onSuccess: (postData) => {
                                        dispatch(setUpdatePost(postData));
                                        accountsCommented.forEach((acc_id) => {
                                            if (acc_id !== my_account?.acc_id) {
                                                socket.emit('send-notify', {
                                                    senderId: my_account?.acc_id,
                                                    receiverId: acc_id,
                                                    data: {
                                                        message: `${my_account?.full_name} bình luận ${inputValue} bài viết ${post?.title}`,
                                                        data: data,
                                                        type: 'comment',
                                                        post: postData,
                                                    },
                                                });
                                            }
                                        });
                                    },
                                },
                            );
                            if (post?.accounts?.acc_id !== my_account?.acc_id) {
                                dispatch(
                                    fetchCreateNotify({
                                        sender_id: my_account?.acc_id,
                                        receiver_id: post?.accounts?.acc_id,
                                        type: 'comment',
                                        isRead: false,
                                        link: `/post/${post?.post_id}`,
                                        title: 'Thông báo',
                                        content: `${my_account?.full_name} bình luận ${inputValue} bài viết ${post?.title}`,
                                    }),
                                );
                            }
                        }

                        if (data?.video_id) {
                            updateVideoMutation.mutate({
                                video_id: video?.video_id,
                                data: {
                                    num_comments: video.num_comments + 1,
                                },
                            });
                            dispatch(
                                fetchCreateNotify({
                                    sender_id: my_account?.acc_id,
                                    receiver_id: video?.accounts?.acc_id,
                                    type: 'comment',
                                    isRead: false,
                                    link: `/video/${video?.id}`,
                                    title: 'Thông báo',
                                    content: `${my_account?.full_name} bình luận ${inputValue} video ${video?.title}`,
                                }),
                            );

                            accountsCommented.forEach((acc_id) => {
                                if (acc_id !== my_account?.acc_id) {
                                    socket.emit('send-notify', {
                                        senderId: my_account?.acc_id,
                                        receiverId: post?.accounts?.acc_id,
                                        data: {
                                            message: `${my_account?.full_name} bình luận ${inputValue} video ${video?.title}`,
                                            data: data,
                                            type: 'comment',
                                        },
                                    });
                                }
                            });
                        }
                        dispatch(setCreateComment(data));
                    },
                },
            );

            setInputValue('');
        }
    };

    const handleDeleteCommentSuccess = async (comment) => {
        if (post?.post_id) {
            updatePostMutation.mutate(
                {
                    post_id: post?.post_id,
                    data: {
                        num_comments: post?.num_comments - 1,
                    },
                },
                {
                    onSuccess: (postData) => {
                        dispatch(setUpdatePost(postData));
                        accountsCommented.forEach((acc_id) => {
                            if (acc_id !== my_account?.acc_id) {
                                socket.emit('send-notify', {
                                    senderId: my_account?.acc_id,
                                    receiverId: acc_id,
                                    data: {
                                        message: `${my_account?.full_name} đã xóa bình luận ${comment?.content} bài viết ${post?.title}`,
                                        data: {
                                            comment_id: comment?.comment_id,
                                        },
                                        post: postData,
                                        type: 'delete-comment',
                                    },
                                });
                                dispatch(
                                    fetchDeleteNotify2({
                                        sender_id: acc_id,
                                        receiver_id: my_account?.acc_id,
                                        title: 'Thông báo',
                                        content: `${my_account?.full_name} bình luận ${comment?.content} bài viết ${comment?.posts?.title}`,
                                    }),
                                );
                            }
                        });
                    },
                },
            );
        }

        if (post?.video_id) {
            updateVideoMutation.mutate(
                {
                    video_id: post?.video_id,
                    data: {
                        num_comments: post?.num_comments - 1,
                    },
                },
                {
                    onSuccess: (videoData) => {
                        dispatch(setUpdateVideo(videoData));
                        accountsCommented.forEach((acc_id) => {
                            if (acc_id !== my_account?.acc_id) {
                                socket.emit('send-notify', {
                                    senderId: my_account?.acc_id,
                                    receiverId: acc_id,
                                    data: {
                                        message: `${my_account?.full_name} đã xóa bình luận ${comment?.content} video ${post?.title}`,
                                        data: {
                                            comment_id: comment?.comment_id,
                                        },
                                        post: videoData,
                                        type: 'delete-comment',
                                    },
                                });
                                dispatch(
                                    fetchDeleteNotify2({
                                        sender_id: acc_id,
                                        receiver_id: my_account?.acc_id,
                                        title: 'Thông báo',
                                        content: `${my_account?.full_name} bình luận ${comment?.content} video ${comment?.posts?.title}`,
                                    }),
                                );
                            }
                        });
                    },
                },
            );
        }
    };

    const updateCommentMutation = useHookMutation(({ comment_id, data }) => {
        return commentService.updateComment(comment_id, data);
    });

    const createReplyCommentMutation = useHookMutation((data) => {
        return replyCommentService.createReplyComment(data);
    });

    const { isPending: isFetchCreateReplyCommentLoading } = createReplyCommentMutation;

    const handleSendReplyComment = async () => {
        if (inputValue.length > 0) {
            createReplyCommentMutation.mutate(
                {
                    content: inputValue.split(' ').slice(1).join(' '),
                    reply_user: currentCommentReply?.accounts?.nickname,
                    comment_id: currentCommentReply?.comment_id,
                    acc_id: my_account?.acc_id,
                },
                {
                    onSuccess: (data) => {
                        setCreateReplyComment(data);
                        if (currentCommentReply?.accounts?.acc_id !== my_account?.acc_id) {
                            dispatch(
                                fetchCreateNotify({
                                    sender_id: my_account?.acc_id,
                                    receiver_id: currentCommentReply?.accounts?.acc_id,
                                    type: 'reply',
                                    isRead: false,
                                    link: `/post/${post?.post_id}`,
                                    title: 'Thông báo',
                                    content: `${my_account?.full_name} đã phản hồi với bình luận "${
                                        currentCommentReply.content
                                    }" của bạn với nội dung "${inputValue.split(' ').slice(1).join(' ')}"`,
                                }),
                            );
                            // notifyService.createNotify({

                            // });
                            socket.emit('send-notify', {
                                receiverId: currentCommentReply?.accounts?.acc_id,
                                data: {
                                    content: `${my_account?.full_name} đã phản hồi với bình luận "${
                                        currentCommentReply.content
                                    }" của bạn với nội dung "${inputValue.split(' ').slice(1).join(' ')}"`,
                                    sender_id: my_account?.acc_id,
                                    receiver_id: currentCommentReply?.accounts?.acc_id,
                                    post_id: post?.post_id,
                                    type: 'reply-comment',
                                },
                            });
                        }
                        updateCommentMutation.mutate(
                            {
                                comment_id: currentCommentReply?.comment_id,
                                data: { num_replies: currentCommentReply?.num_replies + 1 },
                            },
                            {
                                onSuccess: (data) => {
                                    dispatch(setUpdateComment(data));
                                    if (post) {
                                        updatePostMutation.mutate(
                                            {
                                                post_id: post?.post_id,
                                                data: {
                                                    num_comments: post.num_comments + 1,
                                                },
                                            },
                                            {
                                                onSuccess: (data) => {
                                                    dispatch(setUpdatePost(data));
                                                },
                                            },
                                        );
                                    }

                                    if (video) {
                                        updateVideoMutation.mutate(
                                            {
                                                video_id: video?.video_id,
                                                data: {
                                                    num_comments: video.num_comments + 1,
                                                },
                                            },
                                            {
                                                onSuccess: (data) => {
                                                    dispatch(setUpdateVideo(data));
                                                },
                                            },
                                        );
                                    }
                                },
                            },
                        );
                    },
                },
            );
            setInputValue('');
            setCurrentCommentReply(null);
        }
    };

    const handleReplyComment = (comment) => {
        setInputValue(`@${comment?.accounts?.nickname} `);
        setTypeSend('reply');
        setCurrentCommentReply(comment);
    };

    useEffect(() => {
        console.log('currentCommentReply', currentCommentReply);
        console.log('typeSend', typeSend);
    }, [typeSend, currentCommentReply]);

    const handleOnClickEmoji = (emoji) => {
        setInputValue((prev) => prev + emoji.emoji);
        setShowEmojiPicker(false);
        setArcherEmojiPicker(null);
    };

    return (
        <div className={`${className}`}>
            <div className="flex flex-col gap-2 max-h-[300px] min-h-[120px] w-full overflow-auto" style={style}>
                <RenderWithCondition condition={post?.isComment || video?.isComment}>
                    {comment_list &&
                        comment_list.length > 0 &&
                        comment_list.map((comment) => (
                            <Comment
                                key={comment.comment_id}
                                post_owner={post ? post?.accounts?.acc_id : video?.accounts?.acc_id}
                                comment={comment}
                                onReplyComment={() => handleReplyComment(comment)}
                                onDeleteCommentSuccess={() => handleDeleteCommentSuccess(comment)}
                            />
                        ))}
                </RenderWithCondition>

                <RenderWithCondition condition={comment_list?.length === 0}>
                    <p>Chưa có bình luận nào</p>
                </RenderWithCondition>

                <RenderWithCondition condition={!post?.isComment && !video?.isComment}>
                    <p>Nhà sáng tạo đã tắt bình luận</p>
                </RenderWithCondition>
            </div>
            <RenderWithCondition condition={post?.isComment || video?.isComment}>
                <div className="flex items-center justify-between gap-1 px-2 border border-solid border-gray-300 rounded-3xl relative">
                    <CardUser avatar={my_account?.avatar} size="26px" style={{ height: '40px' }} />
                    <div className="flex-1">
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
                            onChange={handleChangeCommentInput}
                            disabled={
                                isFetchCreateCommentLoading ||
                                isFetchCreateReplyCommentLoading ||
                                (!post?.isComment && !video?.isComment)
                            }
                        />
                        <RenderWithCondition
                            condition={isFetchCreateCommentLoading || isFetchCreateReplyCommentLoading}
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
                        <Popper open={showEmojiPicker} anchorEl={archerEmojiPicker} placement="bottom-start">
                            <EmojiPicker
                                onEmojiPickerClose={() => setShowEmojiPicker(false)}
                                open={showEmojiPicker}
                                onEmojiClick={handleOnClickEmoji}
                                lazyLoadEmojis
                            />
                        </Popper>
                    </button>
                    <RenderWithCondition condition={inputValue.length > 0}>
                        <button onClick={typeSend === 'comment' ? handleSendComment : handleSendReplyComment}>
                            <SubmitIcon />
                        </button>
                    </RenderWithCondition>
                </div>
            </RenderWithCondition>
        </div>
    );
}

export default CommentList;
