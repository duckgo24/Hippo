import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { Avatar } from '@mui/material';

import { setDeleteReplyComment, setReplyComments } from '../../../redux/slice/reply-comment.slide';
import Paragraph from '../../Paragraph';
import handleTime from '../../../utils/handleTime';
import RenderWithCondition from '../../RenderWithCondition';
import { HealIcon, TickIcon } from '../../SgvIcon';
import { useSocket } from '../../../providers/socket.provider';
import useHookMutation from '../../../hooks/useHookMutation';
import { commentService } from '../../../services/CommentService';
import { setDeleteComment, setUpdateComment } from '../../../redux/slice/comment.slice';

import { replyCommentService } from '../../../services/ReplyCommentService';
import Loader from '../../Loader';
import Loading from '../../Loading';
import { notifyService } from '../../../services/NotifyService';
import { fetchDeleteNotify2 } from '../../../redux/slice/notify.slice';

function Commemt({ comment, post_owner, onReplyComment, onUpdatePostWhereDeleteComment, onDeleteCommentSuccess }) {
    const { my_account } = useSelector((state) => state.account);
    const { replyComments } = useSelector((state) => state.replyComment);
    const [showReply, setShowReply] = useState(false);
    const socket = useSocket();
    const [likeComment, setLikeComment] = useState(false);
    const dispatch = useDispatch();

    const handleLikeComment = () => {
        setLikeComment(!likeComment);
    };

    const updateCommentMutation = useHookMutation(({ comment_id, data }) => {
        return commentService.updateComment(comment_id, data);
    });

    const deleteCommentMutation = useHookMutation((comment_id) => {
        return commentService.deleteComment(comment_id);
    });

    const { isPending: isLoadingDeleteComment } = deleteCommentMutation;

    const handleDeleteComment = (comment) => {
        deleteCommentMutation.mutate(comment?.comment_id, {
            onSuccess: async (data) => {
                dispatch(setDeleteComment(data));
                onDeleteCommentSuccess(comment);
            },
        });
    };

    const {
        data: replyCommentData,
        isLoading: isFetchReplyCommentLoading,
        isSuccess: isFetchReplyCommentSuccess,
        isError: isFetchReplyCommentError,
    } = useQuery({
        queryKey: ['get-all-reply-comment', comment.comment_id],
        queryFn: () => replyCommentService.getReplyCommnentByCommentId(comment.comment_id),
        enabled: comment.comment_id && showReply,
    });

    const handleShowReply = async () => {
        setShowReply((prev) => !prev);
    };

    useEffect(() => {
        if (isFetchReplyCommentSuccess) {
            dispatch(setReplyComments(replyCommentData));
        }

        if (isFetchReplyCommentError) {
            dispatch(setReplyComments([]));
        }
    }, [showReply, isFetchReplyCommentSuccess, isFetchReplyCommentError]);

    const deleteReplyCommentMutation = useHookMutation((reply_comment_id) => {
        return replyCommentService.deleteReplyComment(reply_comment_id);
    });

    const handleDeleteReplyComment = async (replyComment) => {
        deleteReplyCommentMutation.mutate(replyComment.reply_id, {
            onSuccess: (data) => {
                dispatch(setDeleteReplyComment(data));
                updateCommentMutation(
                    { comment_id: comment?.comment_id, data: { num_replies: comment?.num_replies - 1 } },
                    {
                        onSuccess: (data) => {
                            dispatch(setUpdateComment(data));
                            // socket.emit('send-notify', {
                            //     receiverId: video?.accounts?.acc_id,
                            //     data: {
                            //         content: `${my_account?.full_name} bình luận "${inputValue}" video ${video?.title}}`,
                            //         sender_id: my_account?.acc_id,
                            //         receiver_id: video?.accounts?.acc_id,
                            //         type: "comment",
                            //         video: video?.video_id
                            //     }
                            // });
                        },
                    },
                );
            },
        });
    };

    return (
        <div>
            <div className="flex flex-row justify-around mx-auto gap-2 w-11/12">
                <div>
                    <Avatar
                        src={comment?.accounts?.avatar}
                        alt={comment?.accounts?.nickname}
                        style={{
                            height: '32px',
                            width: '32px',
                        }}
                    />
                </div>
                <div className="flex-1">
                    <div>
                        <div className="flex flex-row gap-2">
                            <Paragraph className="flex gap-1 items-center" bold="500" size="14px" color="#000">
                                {comment.accounts?.full_name}
                                {comment.accounts?.tick && <TickIcon />}
                            </Paragraph>
                            <Paragraph size="14px" color="#000">
                                {handleTime(comment.createdAt)}
                            </Paragraph>
                        </div>
                        <div>
                            <div>
                                <div className="flex flex-row gap-1 text-sm text-black">
                                    <RenderWithCondition condition={comment?.tag}>
                                        <Link to={`/profile/${comment?.tag}`}>@{comment?.tag} </Link>
                                    </RenderWithCondition>
                                    <p>{comment?.content}</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Paragraph size="13px" bold="500">
                                        {comment?.num_likes} lượt thích
                                    </Paragraph>
                                    <button onClick={onReplyComment}>
                                        <Paragraph size="13px" bold="500">
                                            Trả lời
                                        </Paragraph>
                                    </button>
                                    {my_account?.acc_id === comment?.accounts?.acc_id && (
                                        <button
                                            className="flex items-center gap-2"
                                            onClick={() => handleDeleteComment(comment)}
                                        >
                                            <Paragraph size="13px" bold="500">
                                                Xóa
                                            </Paragraph>
                                            <RenderWithCondition condition={isLoadingDeleteComment}>
                                                <Loader />
                                            </RenderWithCondition>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <RenderWithCondition condition={comment?.num_replies > 0}>
                                <button className="flex items-center gap-2" onClick={() => handleShowReply(comment)}>
                                    <Paragraph size="13px" bold="500">
                                        {!showReply ? `── Xem tất cả ` : `── Ẩn tất cả `} {comment?.num_replies} phản
                                        hồi
                                    </Paragraph>
                                    <RenderWithCondition condition={isFetchReplyCommentLoading}>
                                        <Loader />
                                    </RenderWithCondition>
                                </button>

                                <RenderWithCondition condition={showReply}>
                                    <RenderWithCondition condition={isFetchReplyCommentLoading}>
                                        <Loading />
                                    </RenderWithCondition>
                                    <RenderWithCondition condition={!isFetchReplyCommentLoading}>
                                        <div className="flex flex-col gap-2 mt-2">
                                            {replyComments &&
                                                replyComments.length > 0 &&
                                                replyComments.map((reply) => {
                                                    if (reply?.comment_id === comment?.comment_id) {
                                                        return (
                                                            <div
                                                                className="flex flex-row justify-around gap-2"
                                                                key={reply?.reply_id}
                                                            >
                                                                <Avatar
                                                                    src={reply.accounts.avatar}
                                                                    alt={reply?.accounts?.nickname}
                                                                    className="h-8 w-8"
                                                                />

                                                                <div className="flex-1">
                                                                    <div className="flex flex-row gap-2">
                                                                        <p className="flex items-center gap-1 font-medium text-sm text-black">
                                                                            {reply?.accounts?.nickname}
                                                                            {reply?.accounts?.tick && <TickIcon />}
                                                                        </p>
                                                                        <p className="text-sm text-black">
                                                                            {handleTime(reply?.createdAt)}
                                                                        </p>
                                                                    </div>
                                                                    {my_account?.nickname === reply?.reply_user ? (
                                                                        <p className="text-sm text-black">
                                                                            {reply?.content}
                                                                        </p>
                                                                    ) : (
                                                                        <p className="text-sm text-black flex items-center gap-1">
                                                                            {reply?.reply_user && (
                                                                                <Link
                                                                                    className="font-bold"
                                                                                    to={`/profile/${reply?.reply_user}`}
                                                                                >
                                                                                    @{reply?.reply_user}{' '}
                                                                                </Link>
                                                                            )}
                                                                            {reply?.content}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <RenderWithCondition
                                                                    condition={my_account?.acc_id === reply?.acc_id}
                                                                >
                                                                    <button
                                                                        onClick={() => handleDeleteReplyComment(reply)}
                                                                    >
                                                                        <Paragraph size="14px" color="#000">
                                                                            xóa
                                                                        </Paragraph>
                                                                    </button>
                                                                </RenderWithCondition>
                                                            </div>
                                                        );
                                                    }
                                                })}
                                        </div>
                                    </RenderWithCondition>
                                </RenderWithCondition>
                            </RenderWithCondition>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleLikeComment}
                    style={{
                        maxHeight: '100px',
                    }}
                >
                    <HealIcon size={16} active={likeComment} />
                </button>
            </div>
        </div>
    );
}

export default Commemt;
