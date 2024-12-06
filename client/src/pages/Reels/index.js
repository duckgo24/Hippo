

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Reel from "../../components/Reel";
import RenderWithCondition from "../../components/RenderWithCondition";
import { useQuery } from "@tanstack/react-query";



function Reels() {
    const { videos } = useSelector(state => state.video);

    const { my_account } = useSelector(state => state.account)
    const [currentReelRef, setCurrentReelRef] = useState(null);
    const [currentOpenReelId, setCurrentOpenReelId] = useState(null);
    const dispatch = useDispatch();


    const handleReelInView = (reelRef) => {
        if (currentReelRef && currentReelRef.current !== reelRef.current) {
            currentReelRef.current.pause();
        }
        setCurrentReelRef(reelRef);

        if (reelRef.current) {
            reelRef.current.play();
        }
    };
    // const {data: commentData } = useQuery({
    //     queryKey: ['get-comments', reelId],
    //     queryFn: () => fetchGetAllComments({ video_id: reelId, acc_id: my_account?.acc_id }),
    //     enabled: !!reelId
    // })

    const onToggleComments = (reelId) => {
        setCurrentOpenReelId(prevReelId => prevReelId === reelId ? null : reelId);

      
        // dispatch(fetchGetAllComments({ video_id: reelId, acc_id: my_account?.acc_id }));

    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setCurrentOpenReelId(null);
        })
        return () => {
            window.removeEventListener('scroll', () => {
                setCurrentOpenReelId(null);
            })
        }
    }, [])

    useEffect(() => {
        // dispatch(fetchGetAllVideos());
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center gap-5 mx-auto">
            <RenderWithCondition condition={videos && videos.length > 0}>
                {videos.map((video) => (
                    <Reel
                        key={video?.video_id}
                        reel={video}
                        onReelInView={handleReelInView}
                        currentOpenReel={currentOpenReelId}
                        onToggleComments={onToggleComments}
                    />
                ))}
            </RenderWithCondition>
        </div>
    );
}

export default Reels;

