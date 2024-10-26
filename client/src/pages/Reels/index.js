

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Reel from "../../components/Reel";
import { fetchGetAllVideos } from "../../redux/slice/video.slice";
import RenderWithCondition from "../../components/RenderWithCondition";
import { fetchGetAllComments } from "../../redux/slice/comment.slice";



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

    const onToggleComments = (reelId) => {
        setCurrentOpenReelId(prevReelId => prevReelId === reelId ? null : reelId);

        dispatch(fetchGetAllComments({ video_id: reelId, acc_id: my_account?.id }));

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
        dispatch(fetchGetAllVideos());
    }, [dispatch]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            margin="auto"
            padding="40px 0"
            gap="40px"
        >
            <RenderWithCondition condition={videos && videos.length > 0}>
                {videos.map((video) => (
                    <Reel
                        key={video?.id}
                        reel={video}
                        onReelInView={handleReelInView}
                        currentOpenReel={currentOpenReelId}
                        onToggleComments={onToggleComments}
                    />
                ))}
            </RenderWithCondition>
        </Box>
    );
}

export default Reels;

