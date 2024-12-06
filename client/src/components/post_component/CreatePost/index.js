
import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Box, Switch } from "@mui/material";
import EmojiPicker from 'emoji-picker-react';


import GetLinkImage from "../../../utils/GetLinkImage";
import Paragraph from "../../Paragraph";
import CardUser from "../../CardUser";
import { CloseIcon, EmojiIcon, LocationIcon, MediaIcon, MoreIcon } from "../../SgvIcon";
import { setCreatePost } from "../../../redux/slice/post.slice";
import styles from "./CreatePost.module.scss";
import Loader from "../../Loader";
import GetLinkVideo from "../../../utils/GetLinkVideo";
import RenderWithCondition from "../../RenderWithCondition";
import { setCreateVideo } from "../../../redux/slice/video.slice";
import { getLocation } from "../../../utils/getLocation";
import useHookMutation from "../../../hooks/useHookMutation";
import { postService } from "../../../services/PostService";
import { videoService } from "../../../services/VideoService";
import { useSocket } from "../../../providers/socket.provider";
import { notifyService } from "../../../services/NotifyService";
import { fetchCreateNotify } from "../../../redux/slice/notify.slice";



const cx = classNames.bind(styles)

const CreatePost = React.forwardRef(({ onCloseForm, onCreateSuccess }, ref) => {
    const { my_account } = useSelector(state => state.account)
    const { friends } = useSelector(state => state.friend)
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
    const socket = useSocket();



    const handleChangeImage = async (e) => {
        const file = e.target.files[0];
        setImage(null);
        setVideo(null);
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

    const createPostMutation = useHookMutation((data) => {
        return postService.createPost(data);
    });
    const { isPending: isFetchCreatePostLoading } = createPostMutation;



    const createVideoMutation = useHookMutation((data) => {
        return videoService.createVideo(data)
    })
    const { isPending: isFetchCreateVideoLoading } = createVideoMutation;

    const handleCreatePost = () => {
        if (typeSend === 'image') {
            createPostMutation.mutate({
                acc_id: my_account?.acc_id,
                title: text,
                num_likes: 0,
                num_comments: 0,
                image: image,
                location: location ? `${location?.district}, ${location?.province}` : null,
                privacy: isPrivate,
                isComment: isComment,
                tag: tag || null,
            }, {
                onSuccess: (data) => {
                    dispatch(setCreatePost(data));
                    onCreateSuccess();
                    friends.forEach(friend => {
                        socket.emit('send-notify', {
                            senderId: my_account?.acc_id,
                            receiverId: friend?.friend_id,
                            data: {
                                message: `${my_account?.full_name} đã đăng bài viết với nội dung : ${data?.title}`,
                            }
                        });
                        dispatch(fetchCreateNotify({
                            sender_id: my_account?.acc_id,
                            receiver_id: friend?.friend_id,
                            type: "post",
                            isRead: false,
                            link: `/post/${data?.post_id}`,
                            title: "Thông báo",
                            content: `${my_account?.full_name} đã đăng bài viết với nội dung : ${data?.title}`,
                        }))
                        // notifyService.createNotify({
                            
                        // });
                    })
                }
            })
        }

        if (typeSend === 'video') {
            createVideoMutation.mutate({
                acc_id: my_account?.acc_id,
                title: text,
                num_likes: 0,
                num_comments: 0,
                video: video,
                location: location ? `${location?.district}, ${location?.province}` : null,
                privacy: isPrivate,
                isComment: isComment,
                tag: tag || null,
            }, {
                onSuccess: (data) => {
                    dispatch(setCreateVideo(data));
                    onCreateSuccess();
                    friends.forEach(friend => {
                        socket.emit('send-notify', {
                            senderId: my_account?.acc_id,
                            receiverId: friend?.friend_id,
                            data: {
                                message: `${my_account?.full_name} đã đăng video với nội dung : ${data?.title}`,
                            }
                        });
                        dispatch(fetchCreateNotify({
                            sender_id: my_account?.acc_id,
                            receiver_id: friend?.friend_id,
                            type: "video",
                            isRead: false,
                            link: `/video/${data?.video_id}`,
                            title: "Thông báo",
                            content: `${my_account?.full_name} đã đăng video với nội dung : ${data?.title}`,
                        }))
                        // notifyService.createNotify({
                            
                        // });
                    })
                }
            })
        }
    }


    const getMyLocation = async () => {
        setLoadingLocation(true);
        const data = await getLocation();
        if (data) {
            setLoadingLocation(false);
            setLocation(data);
        }

    }



    return (
        <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg flex flex-col" >
            <Box
                height={500}
                width={800}
                borderRadius={4}
                padding='15px 20px'
                position='relative'
            >

                <div className="flex justify-between">
                    <Paragraph bold="500" size="16px" style={{
                        textDecoration: 'underline'
                    }} >
                        Tạo bài viết mới
                    </Paragraph>
                    <div className="flex gap-3">
                        <button onClick={handleCreatePost} disabled={!image && !video}>
                            <Paragraph className={cx('btn-share')} bold="500" size="14px" color={image && video ? "#000" : 'rgba(0,0,0, 0.3)'}>
                                Chia sẻ
                            </Paragraph>
                        </button>
                        <button
                            style={{
                                backgroundColor: 'rgba(255,0,0,0.7)',
                                color: '#fff',
                                border: 'none',
                                padding: '4px 12px',
                                cursor: 'pointer',
                                borderRadius: '50%',
                            }}
                            onClick={handleCloseForm}
                        >
                            X
                        </button>
                    </div>
                </div>
                <div className="flex flex-row gap-3" >
                    <Box
                        display="flex"
                        flexDirection="column"
                        flexWrap="nowrap"
                        justifyContent="center"
                        alignItems="center"
                        width="55%"
                        position='relative'
                    >
                        <RenderWithCondition condition={!image && !video && !imagePreview && !videoPreview}>
                            <MediaIcon size={200} />
                        </RenderWithCondition>
                        <RenderWithCondition condition={image}>
                            <img src={image} className={cx('post')} alt="image" style={{
                                height: '400px',
                                width: '400px',
                                objectFit: 'cover'
                            }} />
                        </RenderWithCondition>


                        <RenderWithCondition condition={imagePreview}>
                            <img src={imagePreview} className={cx('post-preview')} alt="image" style={{
                                height: '400px',
                                width: '400px',
                                objectFit: 'cover'
                            }} />
                            <Loader size={35} style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 9999
                            }} />
                        </RenderWithCondition>


                        <RenderWithCondition condition={video}>
                            <video src={video} controls style={{
                                height: '400px',
                                width: '400px',
                                objectFit: 'cover'
                            }} />
                        </RenderWithCondition>

                        <RenderWithCondition condition={videoPreview}>
                            <video src={videoPreview} className={cx('post-preview')} controls style={{
                                height: '400px',
                                width: '400px',
                                objectFit: 'cover'
                            }} />
                            <Loader size={35} style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 9999
                            }} />
                        </RenderWithCondition>

                    </Box>
                    <div className="flex-1 relative">
                        <CardUser avatar={my_account?.avatar} nickname={my_account?.nickname} tick={my_account?.tick} />
                        <textarea
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
                                height: '350px'
                            }}
                            open={showEmoji}
                            searchDisabled={true}
                            suggestedEmojisMode="none"
                            onEmojiClick={handleOnClickEmoji}
                            lazyLoadEmojis={true}
                        />

                        <div className="flex justify-between mt-2">
                            <RenderWithCondition condition={!location}>
                                <Paragraph> Thêm vị trí </Paragraph>
                            </RenderWithCondition>

                            <RenderWithCondition condition={location}>
                                <Paragraph bold={700}> {`${location?.district}, ${location?.province}`} </Paragraph>
                                <button className="block pr-3" onClick={() => setLocation(null)}>
                                    <CloseIcon />
                                </button>

                            </RenderWithCondition>
                            <RenderWithCondition condition={!location}>
                                <button className="flex pr-3 gap-3" onClick={getMyLocation}>
                                    <RenderWithCondition condition={loadingLocation}>
                                        <Loader size={20} />
                                    </RenderWithCondition>
                                    <LocationIcon />
                                </button>

                            </RenderWithCondition>
                        </div>
                        <div className="flex justify-between">
                            <Paragraph> Riêng tư </Paragraph>
                            <Switch checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
                        </div>
                        <div className="flex justify-between">
                            <Paragraph>Bật bình luận</Paragraph>
                            <Switch checked={isComment} onChange={() => setIsComment(!isComment)} />
                        </div>
                        <div className="flex justify-between">
                            <Paragraph>Nhiều hơn</Paragraph>
                            <button className="block pr-3" >
                                <MoreIcon />
                            </button>
                        </div>
                    </div>
                </div>

            </Box>

            <div className="relative h-8">
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleChangeImage}
                />
                <button
                    style={{
                        position: 'absolute',
                        top: '0%',
                        left: '25%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
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
            </div>
            <RenderWithCondition condition={isFetchCreatePostLoading || isFetchCreateVideoLoading}>
                <div className={cx('loading')}>
                    <Loader />
                </div>
            </RenderWithCondition>
        </div>
    )
});

export default CreatePost;