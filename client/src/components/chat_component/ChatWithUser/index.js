import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { Avatar, Box, Button } from "@mui/material";
=======
import { Avatar, Box } from "@mui/material";
>>>>>>> 29fc6b1... update future Chat
import EmojiPicker from "emoji-picker-react";



import SocketService from "../../../utils/SocketService";
import Paragraph from "../../Paragraph";
import RenderWithCondition from "../../RenderWithCondition";
import MessageChat from "../MessageChat";
<<<<<<< HEAD
import { CloseIcon, EmojiIcon, GifIcon, ImageIcon, MoreIcon, SubmitIcon } from "../../SgvIcon";
import Loading from "../../Loading";
import { fetchGetAllMessages, fetchCreateMessage } from "../../../redux/slice/room-message.slice";

import styles from "./ChatWithUser.module.scss";
import GetLinkImage from "../../../utils/GetLinkImage";
=======
import { EmojiIcon, GifIcon, ImageIcon, MoreIcon, SubmitIcon } from "../../SgvIcon";
import Loading from "../../Loading";
import {fetchGetAllMessages, fetchCreateMessage } from "../../../redux/slice/room-message.slice";

import styles from "./ChatWithUser.module.scss";
>>>>>>> 29fc6b1... update future Chat
const cx = classNames.bind(styles);


function ChatWithUser({ user_chat }) {
    const { my_account } = useSelector(state => state.account);
    const { room_messages, status_message } = useSelector(state => state.roomMessage);
    const { user, room_id } = user_chat;
    const [openEmoji, setOpenEmoji] = useState(false);
    const [myMessage, setMyMessage] = useState("");
<<<<<<< HEAD
    const [imageUrl, setImageUrl] = useState(null);
    const [messages, setMessages] = useState();
    const prevUserChatRef = useRef(user_chat);
    const dispatch = useDispatch();
    const imageInputRef = useRef();

=======
    const [messages, setMessages] = useState();
    const prevUserChatRef = useRef(user_chat);
    const dispatch = useDispatch();

    useEffect(() => {
        if (prevUserChatRef.current !== user_chat) {
            setMessages([]);
            console.log('Previous chat:', prevUserChatRef.current);
            console.log('Current chat:', user_chat);
            prevUserChatRef.current = user_chat;
        }
    }, [user_chat]);
>>>>>>> 29fc6b1... update future Chat

    const handleOnChangeMyMessage = (e) => {
        setMyMessage(e.target.value);
    }

    const handleToggleEmoji = () => {
        setOpenEmoji(prev => !prev);
    }

<<<<<<< HEAD
    const handleOnChooseImage = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    }

    const getImageUrl = async (e) => {
        const url = await GetLinkImage(e.target.files[0]);
        if (url) {
            setImageUrl(url);
        }
    }

    useEffect(() => {
        console.log(imageUrl);
    }, [imageUrl]);

    const handleOnSendMessage = () => {

=======
    const handleOnSendMessage = () => {
        if (!myMessage) return;
>>>>>>> 29fc6b1... update future Chat

        SocketService.emit("send-message", {
            sender: my_account,
            receiver: user,
            content: myMessage,
<<<<<<< HEAD
            iamge: imageUrl,
=======
>>>>>>> 29fc6b1... update future Chat
            created_at: new Date(),
            room_id,
            hasNewMessage: true
        });


        dispatch(fetchCreateMessage({
            acc_id: my_account.id,
            receiver_id: user.id,
            content: myMessage,
            video: "",
<<<<<<< HEAD
            image: imageUrl,
=======
            image: "",
>>>>>>> 29fc6b1... update future Chat
            seen: false,
            room_id
        }))

        setMyMessage("");
<<<<<<< HEAD
        setImageUrl(null);
=======
>>>>>>> 29fc6b1... update future Chat
    };

    const handleClickEmoji = (emojiObject) => {
        setMyMessage(prev => prev + emojiObject.emoji);
        setOpenEmoji(false);
    }

<<<<<<< HEAD

    useEffect(() => {
        if (prevUserChatRef.current !== user_chat) {
            setMessages([]);
            console.log('Previous chat:', prevUserChatRef.current);
            console.log('Current chat:', user_chat);
            prevUserChatRef.current = user_chat;
        }
    }, [user_chat]);

=======
>>>>>>> 29fc6b1... update future Chat
    useEffect(() => {
        SocketService.on("receive-message", (data) => {
            console.log(data);

            setMessages(prev => ({
                ...prev,
                room_messages: [
                    ...prev.room_messages,
                    {
                        content: data?.content,
                        createAt: data?.created_at,
                        seen: false,
                        video: data?.video,
                        image: data?.image,
                        message_sender: data?.sender,
                        message_receiver: data?.receiver
                    }
                ]
            }));
        });

        return () => {
            SocketService.off("receive-message");
        };
    }, []);


    useEffect(() => {
        dispatch(fetchGetAllMessages({
            room_id,
            acc_id: my_account.id
        }))
    }, [user_chat]);

    useEffect(() => {
        if (status_message === 'succeeded') {
            setMessages(room_messages[0]);
<<<<<<< HEAD
=======
            console.log(room_messages[0]);
>>>>>>> 29fc6b1... update future Chat
        }
    }, [status_message]);

    return (
        <Box display="flex" flexDirection="column" height="100vh" gap="10px">
            <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ccc" padding="10px 0">
                <Box display="flex" alignItems="center" gap="10px">
                    <Box position="relative">
                        <Avatar src={user?.avatar} alt={user?.avatar} />
                        <div className={cx({ online: !user?.isOnline })}></div>
                    </Box>
                    <Box>
                        <Paragraph size={16} bold={700} style={{ padding: '0' }}>
                            {user?.full_name}
                        </Paragraph>
                        {!user?.isOnline ? (
                            <Paragraph size={14} style={{ padding: '0' }}>
                                Đang hoạt động
                            </Paragraph>
                        ) : (
                            <Paragraph size={14} style={{ padding: '0', marginTop: '2px' }}>
                                Hoạt động 12 phút trước
                            </Paragraph>
                        )}
                    </Box>
                </Box>
                <Box>
                    <MoreIcon />
                </Box>
            </Box>

<<<<<<< HEAD
            <Box
                padding="2px 10px"
                sx={{
                    overflowY: 'auto',
                }}
                height={650}
            >
=======
            <Box flex={1} padding="2px 10px">
>>>>>>> 29fc6b1... update future Chat
                <RenderWithCondition condition={status_message === 'loading'}>
                    <Loading />
                </RenderWithCondition>
                <RenderWithCondition condition={messages?.room_messages}>
                    {
                        messages?.room_messages
                        && messages?.room_messages.map((message, index) => (
<<<<<<< HEAD
                            <MessageChat key={index} message={message} sender={message.message_sender} />
=======
                            <MessageChat key={index} message={message.content} sender={message.message_sender} />
>>>>>>> 29fc6b1... update future Chat
                        ))
                    }
                </RenderWithCondition>
            </Box>
<<<<<<< HEAD
            <Box
                display="flex"
                flexDirection="row"
                gap="10px"
                position="relative"
                mb={3}
            >
                <button onClick={handleOnChooseImage}>
                    <ImageIcon />
                    <input type="file" style={{ display: 'none' }} ref={imageInputRef} onChange={getImageUrl} />
=======

            <Box display="flex" flexDirection="row" gap="10px" position="relative">
                <button>
                    <ImageIcon />
>>>>>>> 29fc6b1... update future Chat
                </button>
                <button>
                    <GifIcon />
                </button>
                <input
                    placeholder="Aa"
                    style={{
                        padding: '10px 12px',
                        width: '100%',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        borderRadius: '20px',
                        outline: 'none',
                        color: '#000'
                    }}
                    value={myMessage}
                    onChange={handleOnChangeMyMessage}
                />
                <button onClick={handleToggleEmoji}>
                    <EmojiIcon />
                </button>
                {openEmoji && (
                    <EmojiPicker
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            right: '5%',
                            zIndex: '1000',
                            width: '300px',
                            height: '400px'
                        }}
                        onEmojiClick={handleClickEmoji}
                        lazyLoadEmojis={true}
                    />
                )}
<<<<<<< HEAD
                <RenderWithCondition condition={myMessage || imageUrl}>
=======
                <RenderWithCondition condition={myMessage}>
>>>>>>> 29fc6b1... update future Chat
                    <button onClick={handleOnSendMessage}>
                        <SubmitIcon />
                    </button>
                </RenderWithCondition>
<<<<<<< HEAD

                <Box
                    position="absolute"
                    bottom="100%"
                    left="10px"
                    zIndex="9999"
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap="10px"
                >
                    <RenderWithCondition condition={imageUrl}>
                        <img src={imageUrl} alt={"image-send"} style={{
                            border: "1px solid rgba(0, 0, 0, 0.6)",
                            padding: "2px 3px",
                            borderRadius: "50%",
                            width: "62px",
                            height: "60px"
                        }} />
                        <button
                            style={{
                                position: "absolute",
                                top: "-10px",
                                right: "0",
                                padding: "6px 10px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(218, 215, 215, 0.7)",
                                color: "#000",
                            }}
                            onClick={() => setImageUrl(null)}
                        >
                            X
                        </button>
                    </RenderWithCondition>
                </Box>
=======
>>>>>>> 29fc6b1... update future Chat
            </Box>
        </Box>
    );
}

export default ChatWithUser;
