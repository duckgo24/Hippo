import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Reel from "../../components/Reel";
import { fetchGetAllVideos } from "../../redux/slice/video.slice";
import RenderWithCondition from "../../components/RenderWithCondition";
import Post from "../../components/post_component/Post";




function Reels() {
    const { videos } = useSelector(state => state.video);
    const dispatch = useDispatch();
    const [currentReelRef, setCurrentReelRef] = useState(null);

    useEffect(() => {
        dispatch(fetchGetAllVideos());
    }, [dispatch]);

    const handleReelInView = (reelRef) => {
        if (currentReelRef && currentReelRef.current !== reelRef.current) {
            currentReelRef.current.pause();
        }
        setCurrentReelRef(reelRef);
        
        if (reelRef.current) {
            reelRef.current.play();
        }
    };
    useEffect(() => {
        dispatch(fetchGetAllVideos());
    }, []);

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
                    <Reel key={video?.id} reel={video} onReelInView={handleReelInView} />
                ))}
            </RenderWithCondition>
        </Box>
    );
}

export default Reels;