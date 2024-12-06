


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { HealIcon, MessageIcon, ShareIcon } from '../../components/SgvIcon';
import RenderWithCondition from '../../components/RenderWithCondition';
import { Avatar, Box, Divider } from '@mui/material';
import handleTime from '../../utils/handleTime';
import Button from '../../components/Button';

import { BsFillBookmarkPlusFill } from "react-icons/bs";
import CommentList from '../../components/comment_component/CommentList';
import { setComment, setSortCommentDecreaseDay, setSortCommentIncreaseDay } from '../../redux/slice/comment.slice';
import { useQuery } from '@tanstack/react-query';
import { setVideo } from '../../redux/slice/video.slice';
import { videoService } from '../../services/VideoService';
import { commentService } from '../../services/CommentService';
import Loading from '../../components/Loading';


export default function VideoDetail() {
    const { video } = useSelector(state => state.video);
    const { comments } = useSelector(state => state.comment);
    const { comment_id, video_id } = useParams();
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

    const { data: videoData, isSuccess: isFetchVideoSuccess, isError: isFetchVideoError } = useQuery({
        queryKey: ['get-video', video_id],
        queryFn: () => videoService.getVideoById(video_id),
        enabled: !!video_id
    });



    const { data: commentData, isSuccess: isFetchCommentSuccess, isError: isFetchCommentError, isLoading: isFetchCommentLoading } = useQuery({
        queryKey: ['get-all-comment', video_id],
        queryFn: () => commentService.getCommentByVideoId(video_id),
        enabled: !!video_id
    });

    console.log(comments);
    

    useEffect(() => {
        if (isFetchVideoSuccess) {
            dispatch(setVideo(videoData))
        }

        if (isFetchVideoError) {
            navigate('/');
        }

        if (isFetchCommentSuccess) {
            dispatch(setComment(commentData));
        }
        if (isFetchCommentError) {
            dispatch(setComment([])); 
        }
        


    }, [isFetchVideoSuccess, isFetchCommentSuccess, isFetchVideoError, isFetchCommentError])
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
                    <RenderWithCondition condition={video?.video}>
                        <video src={video?.video} controls style={{
                            height: '100%',
                            width: '500px',
                            objectFit: 'cover',
                        }} />
                    </RenderWithCondition>

                </div>
                <div className='flex gap-3 font-bold uppercase items-center'>
                    <p>{video?.title}</p>
                </div>

                <Divider />
                <div className="flex justify-between">
                    <button className="flex items-center text-slate-800 font-medium text-base gap-2 hover:opacity-50">
                        <HealIcon
                            size={23}
                        />
                        <p>{video?.num_likes} lượt thích</p>

                    </button>
                    <button className="flex items-center text-base gap-2 text-slate-800 font-medium hover:opacity-50">
                        <MessageIcon size={23} />
                        <p>{video?.num_comments} bình luận</p>
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
                        <Avatar src={video?.accounts?.avatar} alt={video?.accounts?.full_name} />
                        <div>
                            <p className='font-bold'>{video?.accounts?.full_name}</p>
                            <p className='text-sm'>{handleTime(video?.createdAt, true)}</p>
                        </div>
                    </div>
                    <Button primary leftIcon={<BsFillBookmarkPlusFill size={17} />}>
                        <p>Theo dõi</p>
                    </Button>
                </div>
                <Divider />
                <RenderWithCondition condition={video?.isComment}>
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

                <RenderWithCondition condition={!isFetchCommentLoading && comments}>
                    <CommentList
                        comment_list={comments}
                        video={video}
                        className="flex-1"
                        style={{
                            minHeight: '445px',
                            maxHeight: '445px',
                        }} />
                </RenderWithCondition>

            </div>
        </Box>
    )
}
