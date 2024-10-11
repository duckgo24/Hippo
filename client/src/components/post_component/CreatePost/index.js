
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
import GetLinkVideo from "../../../utils/GetLinkVideo";
import gifLoading from "../../../images/loading.gif";
import { fetchCreateVideo } from "../../../redux/slice/video.slice";
import RenderWithCondition from "../../RenderWithCondition";

const cx = classNames.bind(styles)

function CreatePost({ onCloseForm }) {
    const { my_account } = useSelector(state => state.account)
    const { status_post } = useSelector(state => state.post);
    const { status_video } = useSelector(state => state.video);
    const [typeSend, setTypeSend] = useState("post");
    const [text, setText] = useState("");
    const [numText, setNumText] = useState(0);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [video, setVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef();
    const dispatch = useDispatch();

    const handleOnChangeImage = async (e) => {

        const file = e.target.files[0];

        if (file) {
            if (file.type.includes('image')) {
                setLoading(true);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
                const data = await GetLinkImage(e.target.files[0]);

                if (data) {
                    setLoading(false);
                    setImagePreview(null);
                    setImage(data);
                    setTypeSend("post");
                }
            } else if (file.type.includes('video')) {
                setLoading(true);
                setVideoPreview(URL.createObjectURL(e.target.files[0]));
                const data = await GetLinkVideo({
                    video: e.target.files[0]
                });

                if (data) {
                    setLoading(false);
                    setVideoPreview(null);
                    setVideo(data);
                    setTypeSend("video");
                }
            }
        }

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
        setText("")
        setImage(null)
        onCloseForm();
    }

    const handleOnSubmit = () => {
        if (typeSend === "post") {
            dispatch(fetchCreatePost({
                acc_id: my_account.id,
                title: text,
                num_likes: 0,
                num_comments: 0,
                image: image,
            }));
        }
        if (typeSend === "video") {
            dispatch(fetchCreateVideo({
                acc_id: my_account.id,
                title: text,
                num_likes: 0,
                num_comments: 0,
                video: video,
            }))
        }
    }

    useEffect(() => {
        if (status_post === "succeeded") {
            handleCloseForm();
        }
    }, [status_post])

    useEffect(() => {
        if (status_video === "succeeded") {
            handleCloseForm();
        }
    }, [status_video])



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
                        <RenderWithCondition condition={!image && !video && !loading}>
                            <MediaIcon size={200} />
                        </RenderWithCondition>

                        <RenderWithCondition condition={loading}>
                            <Loader
                                size={35}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1000
                                }} />
                        </RenderWithCondition>
                        <RenderWithCondition condition={imagePreview}>
                            <img className={cx('image-preview')} src={imagePreview} alt="image" height="300px" width="320px" style={{
                                borderRadius: '12px',
                            }} />
                        </RenderWithCondition>
                        <RenderWithCondition condition={image}>
                            <img src={image} alt="image" height="300px" width="320px" style={{
                                borderRadius: '12px'
                            }} />

                        </RenderWithCondition>

                        <RenderWithCondition condition={videoPreview}>
                            <video className={cx('image-preview')} src={videoPreview} alt="image" height="300px" width="320px" style={{
                                borderRadius: '12px',
                            }} />
                        </RenderWithCondition>
                        {video && <video src={video} controls height={300} width={320} style={{
                            borderRadius: '12px'
                        }} />}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleOnChangeImage}
                        />
                        <button
                            disabled={loading}
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
                                top: '50%',
                                right: '-30%',
                                zIndex: 1000,
                                width: '400px',
                                height: '350px'
                            }}
                            open={showEmoji}
                            searchDisabled={true}
                            suggestedEmojisMode="none"
                            onEmojiClick={handleOnClickEmoji}
                            lazyLoadEmojis={true}
                        />
                    </Box>
                </Box>
                <RenderWithCondition condition={status_post === 'loading' || status_video === 'loading'}>
                    <div className={cx('loading')}>
                        <Loader />
                    </div>
                </RenderWithCondition>
            </Box>


        </div>
    );
}

export default CreatePost;