


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { setPost } from '../../redux/slice/post.slice';
import { HealIcon, MessageIcon, ShareIcon } from '../../components/SgvIcon';
import RenderWithCondition from '../../components/RenderWithCondition';
import { Avatar, Box, Divider } from '@mui/material';
import handleTime from '../../utils/handleTime';
import Button from '../../components/Button';

import { BsFillBookmarkPlusFill } from "react-icons/bs";
import CommentList from '../../components/comment_component/CommentList';
import { setComment, setSortCommentDecreaseDay, setSortCommentIncreaseDay } from '../../redux/slice/comment.slice';
import { useQuery } from '@tanstack/react-query';
import { postService } from '../../services/PostService';
import { commentService } from '../../services/CommentService';
import Loader from '../../components/Loader';
import Loading from '../../components/Loading';


export default function PostDetail() {
    const { post } = useSelector(state => state.post);
    const { comments } = useSelector(state => state.comment);
    const { post_id, comment_id } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSortComment = (e) => {
        if (e.target.value === 'newest') {
            dispatch(setSortCommentIncreaseDay())
        }
        if (e.target.value === 'oldest') {
            dispatch(setSortCommentDecreaseDay())
        }
        if (e.target.value === 'normal') {

        }
    }

    const { data: postData, isSuccess: isFetchPostSuccess, isError: isFetchPostError } = useQuery({
        queryKey: ['get-post', post_id],
        queryFn: () => postService.getPostById(post_id),
        enabled: !!post_id
    });



    const { data: commentData, isSuccess: isFetchCommentSuccess, isLoading: isFetchCommentLoading, isError: isFetchCommentError } = useQuery({
        queryKey: ['get-all-comment', post_id],
        queryFn: () => commentService.getCommentByPostId(post_id),
        enabled: !!post_id
    });

    useEffect(() => {
        if (isFetchPostSuccess) {
            dispatch(setPost(postData));
        }

        if (isFetchPostError) {
            navigate('/');
        }

        if (isFetchCommentSuccess) {
            dispatch(setComment(commentData));
        }

        if (isFetchCommentError) {
            dispatch(setComment([]));
        }


    }, [isFetchPostSuccess, isFetchCommentSuccess, isFetchCommentError, isFetchPostError])
    return (
        <div className="flex gap-4 mt-10 p-6 w-4/6 border-1 border-solid border-gray-300 rounded-5px shadow-0-2-5-rgba(0, 0, 0, 0.1) bg-white text-black mx-auto">
            <div
                className='flex flex-col gap-3'
                style={{
                    maxWidth: '600px'
                }}
            >
                <div
                    className="w-full flex flex-col"
                    style={{
                        height: '500px'
                    }}
                >
                    <RenderWithCondition condition={post?.image}>
                        <img src={post?.image} alt={post?.title} loading="lazy" style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }} />
                    </RenderWithCondition>

                </div>
                <div className='flex gap-3 font-bold uppercase items-center'>
                    <p>{post?.title}</p>
                </div>

                <Divider />
                <div className="flex justify-between">
                    <button className="flex items-center text-slate-800 font-medium text-base gap-2 hover:opacity-50">
                        <HealIcon
                            size={23}
                        />
                        <p>{post?.num_likes} lượt thích</p>
                    </button>
                    <button className="flex items-center text-base gap-2 text-slate-800 font-medium hover:opacity-50">
                        <MessageIcon size={23} />
                        <p>{post?.num_comments} bình luận</p>
                    </button>
                    <button className="relative flex items-center gap-2 text-slate-800 font-medium hover:opacity-50">
                        <ShareIcon />
                        <p>Chia sẻ</p>
                    </button>
                </div>
            </div>
            <div
                className='flex flex-col gap-3 h-full overflow-hidden'
                style={{
                    width: '500px'
                }}>
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-2'>
                        <Avatar src={post?.accounts?.avatar} alt={post?.accounts?.full_name} />
                        <div>
                            <p className='font-bold'>{post?.accounts?.full_name}</p>
                            <p className='text-sm'>{handleTime(post?.createdAt, true)}</p>
                        </div>
                    </div>
                    <Button primary leftIcon={<BsFillBookmarkPlusFill size={17} />}>
                        <p>Theo dõi</p>
                    </Button>
                </div>
                <Divider />
                <RenderWithCondition condition={post?.isComment}>
                    <div className='flex'>
                        <select onChange={handleSortComment} className='outline-none bg-transparent'>
                            <option value="normal">Phù hợp nhất</option>
                            <option value="newest">Mới nhất</option>
                            <option value="oldest">Lâu nhất</option>
                        </select>
                    </div>
                </RenderWithCondition>

                <RenderWithCondition condition={isFetchCommentLoading}>
                    <Loading />
                </RenderWithCondition>

                <RenderWithCondition condition={!isFetchCommentLoading}>
                    <CommentList
                        comment_list={comments}
                        post={post}
                        className="flex-1"
                        style={{
                            minHeight: '445px',
                            maxHeight: '445px',
                        }} />
                </RenderWithCondition>
            </div>
        </div>
    )
}
