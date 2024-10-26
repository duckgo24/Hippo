
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import { Box, Switch, TextareaAutosize } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';

import { useDispatch, useSelector } from "react-redux";
import GetLinkImage from "../../../utils/GetLinkImage";
import Paragraph from "../../Paragraph";
import CardUser from "../../CardUser";
import { CloseIcon, EmojiIcon, LocationIcon, MediaIcon, MoreIcon } from "../../SgvIcon";
import { fetchCreatePost } from "../../../redux/slice/post.slice";


import styles from "./CreatePost.module.scss";
import Loader from "../../Loader";
import GetLinkVideo from "../../../utils/GetLinkVideo";
import RenderWithCondition from "../../RenderWithCondition";
import { fetchCreateVideo } from "../../../redux/slice/video.slice";
import { getLocation } from "../../../utils/getLocation";



const cx = classNames.bind(styles)

const CreatePost = React.forwardRef(({ onCloseForm }, ref) => {
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
    const [location, setLocation] = useState("");
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isComment, setIsComment] = useState(true);
    const [tag, setTag] = useState("");
    const [showTag, setShowTag] = useState(false);



    const fileInputRef = useRef();
    const dispatch = useDispatch();



    const handleOnChangeImage = async (e) => {
        const file = e.target.files[0];
        if (file.type.includes('image')) {
            setTypeSend('image');
            setImagePreview(URL.createObjectURL(file));
            const url = await GetLinkImage(file);
            if (url) {
                setImage(url);
                setImagePreview(null);
            }
        }

        if (file.type.includes('video')) {
            setTypeSend('video');
            setVideoPreview(URL.createObjectURL(file));
            const url = await GetLinkVideo(file);
            if (url) {
                setVideo(url);
                setVideoPreview(null);
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

    const handleOnSendPost = () => {
        if (typeSend === 'image') {
            dispatch(fetchCreatePost({
                acc_id: my_account.id,
                title: text,
                num_likes: 0,
                num_comments: 0,
                image: image,
                location: location ? `${location?.district}, ${location?.province}` : null,
                privacy: isPrivate,
                isComment: isComment,
                tag: tag || null,
            }));
        }

        if (typeSend === 'video') {
            dispatch(fetchCreateVideo({
                acc_id: my_account.id,
                title: text,
                num_likes: 0,
                num_comments: 0,
                video: video,
                location: location ? `${location?.district}, ${location?.province}` : null,
                privacy: isPrivate,
                isComment: isComment,
                tag: tag || null,
            }))
        }
    }




    const getMyLocation = async () => {
        setLoadingLocation(true);
        const data = await getLocation();
        if(data) {
            setLoadingLocation(false);
            setLocation(data);
        }
        
    }


    useEffect(() => {
        if (status_post === "succeeded" || status_video === "succeeded") {
            console.log(status_video);

            onCloseForm();
        }
    }, [status_post, status_video])


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
                height={500}
                width={750}
                borderRadius={4}
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
                        <button onClick={handleOnSendPost}>
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
                        <RenderWithCondition condition={!image && !video && !imagePreview && !videoPreview}>
                            <MediaIcon size={200} />
                        </RenderWithCondition>
                        <RenderWithCondition condition={image}>
                            <img src={image} alt="image" height="350px" width="350px" />

                        </RenderWithCondition>
                        <RenderWithCondition condition={video}>
                            <video src={video} controls height="350px" width="350px" />
                        </RenderWithCondition>

                        <RenderWithCondition condition={imagePreview}>
                            <img src={imagePreview} className={cx('post-preview')} alt="image" height="350px" width="350px" />
                            <Loader size={35} style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 9999
                            }} />
                        </RenderWithCondition>

                        <RenderWithCondition condition={videoPreview}>
                            <video src={videoPreview} className={cx('post-preview')} controls height="350px" width="350px" />
                            <Loader size={35} style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 9999
                            }} />
                        </RenderWithCondition>
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
                            Ảnh/Video
                        </button>
                    </Box>
                    <Box flex={1} position='relative'>
                        <CardUser avatar={my_account?.avatar} nickname={my_account?.nickname} tick={my_account?.tick} />
                        <TextareaAutosize
                            style={{
                                width: '100%',
                                height: 170,
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

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mt={2}
                        >
                            <RenderWithCondition condition={!location}>
                                <Paragraph> Thêm vị trí </Paragraph>
                            </RenderWithCondition>

                            <RenderWithCondition condition={location}>
                                <Paragraph bold={700}> {`${location?.district}, ${location?.province}`} </Paragraph>
                                <button
                                    style={{
                                        display: 'block',
                                        padding: '0 14px 0 0',
                                    }}
                                    onClick={() => setLocation(null)}
                                >
                                    <CloseIcon />
                                </button>

                            </RenderWithCondition>
                            <RenderWithCondition condition={!location}>
                                <button
                                    style={{
                                        display: 'flex',
                                        padding: '0 14px 0 0',
                                        gap: '10px',
                                    }}
                                    onClick={getMyLocation}
                                >
                                    <RenderWithCondition condition={loadingLocation}>
                                        <Loader size={20} />
                                    </RenderWithCondition>

                                    <LocationIcon />
                                </button>

                            </RenderWithCondition>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Paragraph> Riêng tư </Paragraph>
                            <Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Paragraph>Bật bình luận</Paragraph>
                            <Switch checked={isComment} onChange={() => setIsComment(!isComment)} />
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Paragraph>Nhiều hơn</Paragraph>
                            <button
                                style={{
                                    display: 'block',
                                    padding: '0 14px 0 0',
                                }}
                            > <MoreIcon /> </button>
                        </Box>
                    </Box>
                </Box>
                <RenderWithCondition condition={status_post === 'loading' || status_video === 'loading'}>
                    <div className={cx('loading')}>
                        <Loader />
                    </div>
                </RenderWithCondition>
            </Box>


        </div>
    )
});

export default CreatePost;