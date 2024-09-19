
import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { Box, TextareaAutosize } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';

import { useDispatch, useSelector } from "react-redux";
import GetLinkImage from "../../../utils/GetLinkImage";
import Paragraph from "../../Paragraph";
import CardUser from "../../CardUser";
import { EmojiIcon, MediaIcon } from "../../SgvIcon";
import { fetchCreatePost } from "../../../redux/slice/post.slice";


import styles from "./CreatePost.module.scss";
import Loader from "../../Loader";



const cx = classNames.bind(styles)

function CreatePost({ show }) {
    const { my_account } = useSelector(state => state.account)
    const { status_post } = useSelector(state => state.post);
    const [typeSend, setTypeSend] = useState("post");
    const [text, setText] = useState("");
    const [numText, setNumText] = useState(0);
    const [image, setImage] = useState(null);
    const [showForm, setShowForm] = useState(show);
    const [showEmoji, setShowEmoji] = useState(false);
    const fileInputRef = useRef();
    const dispatch = useDispatch();



    const handleOnChangeImage = async (e) => {
        const data = await GetLinkImage(e.target.files[0]);
        setImage(data);
    }
    
    const handleSubmit = async () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleOnInputChange = (e) => {
        setText(e.target.value)
        setNumText(text.length);
    }

    const handleShowEmojis = () => {
        setShowEmoji(!showEmoji);
    }

    const handleOnClickEmoji = (emoji) => {
        setText(prev => prev + emoji.emoji)
        setShowEmoji(false)
    }




    const handleCloseForm = () => {
        setShowForm(false)
        setText("")
        setImage(null)
    }

    const handleOnSubmit = () => {
        dispatch(fetchCreatePost({
            acc_id: my_account.id,
            title: text,
            num_likes: 0,
            num_comments: 0,
            image: image
        }));
    }

    useEffect(() => {
        if (status_post === "succeeded") {
            handleCloseForm();
        }
    }, [status_post])

    useEffect(() => {
        setShowForm(show);
    }, [show]);



    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -45%)',
                zIndex: 9999
            }}
        >
            {showForm &&
                <Box
                    bgcolor='#fff'
                    boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px'
                    height={400}
                    width={700}
                    padding='15px 20px'
                    position='relative'
                >

                    <Box
                        display="flex"
                        justifyContent='space-between'
                    >
                        <Paragraph bold="500" size="16px" style={{
                            textDecoration: 'underline'
                        }} >
                            Tạo bài viết mới
                        </Paragraph>
                        <Box
                            display='flex'
                            gap='10px'>
                            <button onClick={handleOnSubmit}>
                                <Paragraph className={cx('btn-share')} bold="500" size="14px" >
                                    Chia sẻ
                                </Paragraph>
                            </button>
                            <button
                                style={{
                                    backgroundColor: 'rgba(255,0,0,0.7)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '6px 10px',
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                }}
                                onClick={handleCloseForm}
                            >
                                X
                            </button>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap="10px"
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            flexWrap="nowrap"
                            justifyContent="center"
                            alignItems="center"
                            width="50%"
                            position='relative'
                        >
                            {!image && <MediaIcon size={200} />}
                            {image && <img src={image} alt="image" height="300px" width="320px" />}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleOnChangeImage}
                            />
                            <button
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    bottom: '-5%',
                                    transform: 'translate(-50%, 80%)',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 20px',
                                    cursor: 'pointer',
                                    borderRadius: '12px',
                                    width: '200px',
                                    maxWidth: '250px'
                                }}
                                onClick={handleSubmit}
                            >
                                Chọn ảnh
                            </button>
                        </Box>
                        <Box flex={1} position='relative'>
                            <CardUser avatar={my_account?.avatar} nickname={my_account?.nickname} tick={my_account?.tick} />
                            <TextareaAutosize
                                style={{
                                    width: '100%',
                                    height: 220,
                                    fontSize: '18px',
                                    border: 'none',
                                    outline: 'none',
                                    marginTop: '10px',

                                }}
                                value={text}
                                onChange={handleOnInputChange}
                            />
                            <Box
                                display='flex'
                                justifyContent='space-between'
                                position='relative'
                            >
                                <button onClick={handleShowEmojis}>
                                    <EmojiIcon />
                                </button>
                                <span style={{
                                    fontSize: '12px',
                                    marginTop: '10px',
                                }}>{numText}/2200</span>

                            </Box>
                            <EmojiPicker
                                style={{
                                    position: 'absolute',
                                    bottom: '-100px',
                                    right: '0px',
                                    zIndex: 1000,
                                    width: '300px',
                                    height: '250px'
                                }}
                                open={showEmoji}
                                searchDisabled={true}
                                suggestedEmojisMode="none"
                                onEmojiClick={handleOnClickEmoji}
                                lazyLoadEmojis={true}
                            />
                        </Box>
                    </Box>
                    {
                        status_post === 'loading'
                        &&
                        <div className={cx('loading')}>
                            <Loader />
                        </div>
                    }

                </Box>

            }
        </div>
    );
}

export default CreatePost;