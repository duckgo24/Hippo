import { Box, Divider, Popper, Typography } from "@mui/material";
import CardUser from "../CardUser";
import { BlockIcon, CloseIcon, DeleteIcon, HealIcon, MessageIcon, MoreIcon } from "../SgvIcon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatePost } from "../../redux/slice/post.slice";
import { fetchDislikesPost, fetchLikePost } from "../../redux/slice/like.slice";
import HandleTime from "../../utils/handleTime";
import Paragraph from "../Paragraph";
import CommentList from "../CommentList";
import { fetchGetAllComments } from "../../redux/slice/comment.slice";

const styles = {
    buttonStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        fontSize: '16px'
    },
}

function Post({ post, style }) {
    const { my_account } = useSelector(state => state.account);
    const { comments } = useSelector(state => state.comment);
    const [activeHealIcon, setActiveHealIcon] = useState(
        post?.likes?.some(like => like.acc_id === my_account.id)
    );
    const [anchorElComment, setAnchorElComment] = useState(null);
    const [openComment, setOpenComment] = useState(false);

    const [anchorElOptionPost, setAnchorElOptionPost] = useState(null);
    const [openOptionPost, setOpenOptionPost] = useState(false);
    const dispatch = useDispatch();


    const handleToggleComments = (event) => {
        setAnchorElComment(anchorElComment ? null : event.currentTarget);
        setOpenComment(!openComment);
    };

    const toggleOptionPost = (e) => {
        setAnchorElOptionPost(anchorElOptionPost ? null : e.currentTarget);
        setOpenOptionPost(!openOptionPost);
    }

    const handleClickLike = () => {
        setActiveHealIcon(!activeHealIcon);

        if (!activeHealIcon) {
            dispatch(fetchLikePost({
                acc_id: my_account.id,
                post_id: post.id,
                is_like: true
            }));

            dispatch(fetchUpdatePost({
                id: post.id,
                num_likes: post.num_likes + 1,
            }));
        } else {
            dispatch(fetchDislikesPost({
                acc_id: my_account.id,
                post_id: post.id,
            }));

            dispatch(fetchUpdatePost({
                id: post.id,
                num_likes: post.num_likes - 1,
            }));
        }
    };


    useEffect(() => {
        if (openComment) {
            if (post.id !== comments[0]?.post_id) {
                dispatch(fetchGetAllComments({
                    post_id: post.id,
                }));
            }
        }
    }, [openComment])

    useEffect(() => {
        const handleScroll = () => {
            setAnchorElComment(null);
            setOpenComment(false);
            setAnchorElOptionPost(null);
            setOpenOptionPost(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);




    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            gap="10px"
            mb={2}
            py={2}
            px={3}
            border="1px solid #ccc"
            borderRadius="5px"
            boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
            background="white"
            color="black"
            maxWidth={450}
            width={450}
            sx={{
                '&:hover': {
                    cursor: "pointer"
                },
            }}
            style={style}
        >
            <Box
                display="flex"
                justifyContent="space-between"
            >
                <CardUser nickname={post.accounts?.nickname} tick={post.accounts?.tick} avatar={post.accounts?.avatar} />
                <button onClick={toggleOptionPost}>
                    <MoreIcon />
                </button>
                <Popper
                    open={openOptionPost}
                    anchorEl={anchorElOptionPost}
                    placement="bottom"
                >
                    <Box
                        maxWidth="200px"
                        minWidth="100px"
                        border="1px solid #ccc"
                        bgcolor="white"
                        display='flex'
                        flexDirection='column'
                        borderRadius="5px"
                    >
                        <button style={{
                            padding: '5px 10px',
                        }}>
                            <Paragraph color="#000">
                                <BlockIcon size={18} />
                                Chặn bài viết
                            </Paragraph>
                        </button>
                        <Divider />
                        {
                            post.accounts.id == my_account.id
                            &&
                            <button style={{
                                padding: '5px 10px',
                            }}
                            >
                                <Paragraph color="#000">
                                    <DeleteIcon size={14} />
                                    Xóa bài viết
                                </Paragraph>
                            </button>
                        }
                    </Box>
                </Popper>


            </Box>
            <Typography variant="body2">
                {HandleTime(post.createdAt)}
            </Typography>
            <Typography variant="subtitle2">
                {post.title}
            </Typography>

            <div style={{ overflow: 'hidden', borderRadius: '5px' }}>
                <img src={post.image} alt={post.title} height={290} loading="lazy" style={{
                    display: 'block',
                    width: '100%',
                    objectFit: 'cover',
                }} />
            </div>

            <Box
                display="flex"
                gap="10px"
            >
                <button style={styles.buttonStyle} onClick={handleClickLike} >
                    <HealIcon
                        size={23}
                        color={activeHealIcon ? "#f00" : "#000"}
                        style={{
                            stroke: activeHealIcon ? "#f00" : "#000"
                        }}
                        active={activeHealIcon}
                    />
                    {post.num_likes}
                </button>
                <button aria-describedby="open-comment" style={styles.buttonStyle} onClick={handleToggleComments}>
                    <MessageIcon size={23} />
                    {post.num_comments}
                </button>
                <Popper
                    id="open-comment"
                    open={openComment}
                    anchorEl={anchorElComment}
                    placement="right-start"
                >

                    <Box sx={{
                        border: 1,
                        p: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 4,
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        width: 450,
                        maxWidth: '90%',
                        minHeight: '100px',
                        marginLeft: 'auto',
                    }}>
                        <Box
                            position="relative"
                            height={40}
                            display="flex"
                            alignItems="center"
                            gap="10px"
                            padding=" 0 10px"

                        >
                            <button onClick={handleToggleComments}>
                                <CloseIcon size={16} />
                            </button>
                            <Paragraph color="#000" bold="600" style={{
                                fontSize: '18px',
                                lineHeight: '20px',
                                textAlign: 'center',
                                flex: 1
                            }} >
                                Bình luận
                            </Paragraph>
                        </Box>
                        {openComment && <CommentList post={post} comment_list={comments} />}

                    </Box>

                </Popper>
            </Box>
        </Box>
    );
}

export default Post;
