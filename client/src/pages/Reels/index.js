import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { fetchGetAllPosts } from "../../redux/slice/post.slice";
import Reel from "../../components/Reel";




function Reels() {
    const { posts } = useSelector(state => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchGetAllPosts());
    }, []);

    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            width="70%"
            margin="auto"
            padding="40px 0"
            gap="10px"
        >
            {posts.map((post) => (
                <Reel key={post.id} image={post.image} likes={post.num_likes} comments={post.num_comments} />
            ))}
        </Box>
    );
}

export default Reels;