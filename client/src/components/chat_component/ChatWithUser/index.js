import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";
import EmojiPicker from "emoji-picker-react";



import SocketService from "../../../utils/SocketService";
import Paragraph from "../../Paragraph";
import RenderWithCondition from "../../RenderWithCondition";
import MessageChat from "../MessageChat";
import { EmojiIcon, GifIcon, ImageIcon, MoreIcon, SubmitIcon } from "../../SgvIcon";
import Loading from "../../Loading";
import {fetchGetAllMessages, fetchCreateMessage } from "../../../redux/slice/room-message.slice";

import styles from "./ChatWithUser.module.scss";
const cx = classNames.bind(styles);


function ChatWithUser({ user_chat }) {
    const { my_account } = useSelector(state => state.account);
    const { room_messages, status_message } = useSelector(state => state.roomMessage);
    const { user, room_id } = user_chat;
    const [openEmoji, setOpenEmoji] = useState(false);
    const [myMessage, setMyMessage] = useState("");
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

    const handleOnChangeMyMessage = (e) => {
        setMyMessage(e.target.value);
    }

    const handleToggleEmoji = () => {
        setOpenEmoji(prev => !prev);
    }

    const handleOnSendMessage = () => {
        if (!myMessage) return;

        SocketService.emit("send-message", {
            sender: my_account,
            receiver: user,
            content: myMessage,
            created_at: new Date(),
            room_id,
            hasNewMessage: true
        });


        dispatch(fetchCreateMessage({
            acc_id: my_account.id,
            receiver_id: user.id,
            content: myMessage,
            video: "",
            image: "",
            seen: false,
            room_id
        }))

        setMyMessage("");
    };

    const handleClickEmoji = (emojiObject) => {
        setMyMessage(prev => prev + emojiObject.emoji);
        setOpenEmoji(false);
    }

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
            console.log(room_messages[0]);
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

            <Box flex={1} padding="2px 10px">
                <RenderWithCondition condition={status_message === 'loading'}>
                    <Loading />
                </RenderWithCondition>
                <RenderWithCondition condition={messages?.room_messages}>
                    {
                        messages?.room_messages
                        && messages?.room_messages.map((message, index) => (
                            <MessageChat key={index} message={message.content} sender={message.message_sender} />
                        ))
                    }
                </RenderWithCondition>
            </Box>

            <Box display="flex" flexDirection="row" gap="10px" position="relative">
                <button>
                    <ImageIcon />
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
                <RenderWithCondition condition={myMessage}>
                    <button onClick={handleOnSendMessage}>
                        <SubmitIcon />
                    </button>
                </RenderWithCondition>
            </Box>
        </Box>
    );
}

export default ChatWithUser;
