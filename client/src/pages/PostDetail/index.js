


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchGetPostById } from '../../redux/slice/post.slice';
import Post from '../../components/post_component/Post';
import { HealIcon, MessageIcon, ShareIcon } from '../../components/SgvIcon';
import RenderWithCondition from '../../components/RenderWithCondition';
import { Avatar, Box, Divider } from '@mui/material';
import handleTime from '../../utils/handleTime';
import Button from '../../components/Button';

import { BsFillBookmarkPlusFill } from "react-icons/bs";
import CommentList from '../../components/comment_component/CommentList';
import { fetchGetAllComments, setSortCommentDecreaseDay, setSortCommentIncreaseDay } from '../../redux/slice/comment.slice';


export default function PostDetail() {
    const { post } = useSelector(state => state.post);
    const { comments } = useSelector(state => state.comment);
    const { post_id, comment_id } = useParams();
    const dispatch = useDispatch();


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

    useEffect(() => {
        async function a() {
            if (post_id) {
                dispatch(fetchGetPostById({
                    post_id
                }));
                dispatch(fetchGetAllComments({
                    post_id
                }));
            }
        }
        a();
    }, [post_id, comment_id])
    return (
        <Box
            className="flex gap-2"
            mt={10}
            py={2}
            px={3}
            maxHeight="650px"
            border="1px solid #ccc"
            borderRadius="5px"
            boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
            backgroundColor="white"
            color="black"
            mx={"auto"}
            sx={{
                '&:hover': {
                    cursor: "pointer"
                },
            }}

        >
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
                    <RenderWithCondition condition={post?.video}>
                        <video src={post?.video} controls style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }} />
                    </RenderWithCondition>

                </div>
                <div className='flex gap-3 font-bold uppercase items-center'>
                    <span className="text-black">|</span>
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
                        <p> {post?.num_comments} Bình luận </p>

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
                {post?.isComment &&
                    <div className='flex'>
                        <select onChange={handleSortComment} className='outline-none bg-transparent'>
                            <option value="normal">Phù hợp nhất</option>
                            <option value="newest">Mới nhất</option>
                            <option value="oldest">Lâu nhất</option>
                        </select>
                    </div>}
                <CommentList
                    comment_list={comments}
                    post={post}
                    className="flex-1"
                    style={{
                        minHeight: '445px',
                        maxHeight: '445px',
                    }} />

            </div>
        </Box>
    )
}
