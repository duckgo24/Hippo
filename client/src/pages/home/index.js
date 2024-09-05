import { Box, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../redux/slice/account.slice";
import { CheckIcon, DropDownIcon, PlusIcon2 } from "../../components/SgvIcon";
import Paragraph from "../../components/Paragraph";
import Alert from "../../components/Alert";
import { fetchGetAllPosts } from "../../redux/slice/post.slice";
import CreatePost from "../../components/ui/CreatePost";
import Post from "../../components/Post";
import avatarWhite from "../../images/white-avatar.png";
import { useNavigate } from "react-router-dom";
import { fetchGetAllPostsLiked } from "../../redux/slice/like.slice";
import Cookies from 'js-cookie'
import { fetchGetAllFriend } from "../../redux/slice/friend.slice";

function HomeIcon() {
    const { my_account } = useSelector(state => state.account);
    const { status_post, posts } = useSelector(state => state.post);
    const { likePosts } = useSelector(state => state.like);
    const { friends } = useSelector(state => state.friend);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [idxMenuDropDown, setIdxMenuDropDown] = useState(0);
    const [displayPosts, setDisplayPosts] = useState('all');
    const [optionPost, setOptionPost] = useState('Dành cho bạn')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenDropDown = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickDropDownItem = async (text, idx) => {
        setAnchorEl(null);
        setIdxMenuDropDown(idx);

        if (text === 'Dành của bạn') {
            setOptionPost('Dành của bạn');
            setDisplayPosts('all');
            return;
        }

        if (text === 'Đang theo dõi') {
            setOptionPost('Đang theo dõi');
            return;
        }

        if (text === 'Đã thích') {
            if (likePosts.length === 0) {
                dispatch(fetchGetAllPostsLiked({ acc_id: my_account.id }));
            }
            setOptionPost('Đã thích');
            setDisplayPosts('liked');
            return;
        }
    };


    const handleClickIcon = () => {
        setShowCreatePost(!showCreatePost);
    }

    useEffect(() => {

        if (!Cookies.get('access_token')) {
            navigate('/login');
            return;
        }


        dispatch(fetchGetAllFriend({ acc_id: my_account?.id }));
        dispatch(fetchAuthMe());
        dispatch(fetchGetAllPosts());

        
    }, [dispatch]);





    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                width="80%"
                margin="auto"
                height="100%"
                padding="40px 0"
            >
                <Box
                    position='relative'
                    marginLeft='10px'
                >
                    <img src={my_account.avatar ? my_account.avatar : avatarWhite} alt='avatar' height={70} />
                    <button
                        onClick={handleClickIcon}
                        style={{
                            height: '35px',
                            width: '35px',
                            backgroundColor: '#0095f6',
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            top: "45px",
                            left: "40px",
                            cursor: 'pointer',
                        }}
                    >
                        <PlusIcon2 size={20} style={{ color: '#fff' }} />
                    </button>
                </Box>
                <Box
                    display="flex"
                    gap="10px"
                    alignItems="center"
                    padding="20px 0"
                >
                    <Paragraph bold='500' style={{ marginBottom: '5px' }} >
                        {optionPost}
                    </Paragraph>
                    <button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleOpenDropDown}
                    >
                        <DropDownIcon size={20} />
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                        sx={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                    >
                        <MenuItem
                            sx={{ width: '250px', display: 'flex', justifyContent: 'space-between' }}
                            onClick={() => handleClickDropDownItem('Dành của bạn', 0)}
                        >
                            <span>Dành của bạn</span>
                            {idxMenuDropDown === 0 && <CheckIcon />}
                        </MenuItem>
                        <MenuItem
                            sx={{ width: '250px', display: 'flex', justifyContent: 'space-between' }}
                            onClick={() => handleClickDropDownItem('Đang theo dõi', 1)}
                        >
                            <span>Đang theo dõi</span>
                            {idxMenuDropDown === 1 && <CheckIcon />}
                        </MenuItem>
                        <MenuItem
                            sx={{ width: '250px', display: 'flex', justifyContent: 'space-between' }}
                            onClick={() => handleClickDropDownItem('Đã thích', 2)}
                        >
                            <span>Đã thích</span>
                            {idxMenuDropDown === 2 && <CheckIcon />}
                        </MenuItem>
                    </Menu>
                </Box>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    {(displayPosts === 'all' ? posts : likePosts)?.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </Box>
                <CreatePost show={showCreatePost} />
                {status_post === 'succeeded' && (
                    <Alert type='success' title='Thông báo' message='Đăng bài thành công' />
                )}
            </Box>
        </>
    );
}

export default HomeIcon;
