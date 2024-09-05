import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import { Avatar, Box } from "@mui/material";

import Paragraph from "../Paragraph";
import { EmojiIcon, GifIcon, ImageIcon, MoreIcon, SubmitIcon } from "../SgvIcon";
import MessageChat from "../MessageChat";

import SocketService from "../../utils/SocketService";

import styles from "./ChatWithUser.module.scss";

const cx = classNames.bind(styles);

function ChatWithUser({ receiver }) {
    const { my_account } = useSelector(state => state.account);
    const [myMessage, setMyMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleOnChangeMyMessage = (e) => {
        setMyMessage(e.target.value);
    }

    const handleOnSendMessage = () => {
        SocketService.emit("send-private-message", {
            sender_id: my_account.id,
            receiver_id: 5,
            content: myMessage,
            room_id: `123`
        })

        SocketService.on("receive-private-message", (data) => {
            console.log(data);
        });

    }

    useEffect(() => {
        SocketService.emit("join-room", {
            room_id: "123"
        });
    
    
    }, [my_account, receiver]);
    


    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100vh"
            gap="10px"
        >
            <Box
                display="flex"
                justifyContent="space-between"
                borderBottom="1px solid #ccc"
                padding="10px 0"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap="10px"
                >
                    <Box position="relative">
                        <Avatar src={receiver?.avatar} alt={receiver?.avatar} />
                        <div className={cx({ online: receiver?.status === 'online' })}></div>
                    </Box>
                    <Box>
                        <Paragraph size={16} bold={700} style={{
                            padding: '0'
                        }}>{receiver?.full_name}</Paragraph>
                        {receiver?.isOnline ?
                            <Paragraph size={14} style={{
                                padding: '0'
                            }}>Đang hoạt động</Paragraph>
                            :
                            <Paragraph size={14} style={{
                                padding: '0',
                                marginTop: '2px'
                            }}>Hoạt động 12 phút trước</Paragraph>
                        }
                    </Box>
                </Box>
                <Box>
                    <MoreIcon />
                </Box>
            </Box>

            <Box flex={1} padding="2px 10px">
                {/* message */}
                {messages.map((message, index) => (
                    <MessageChat key={index} message={message.content} sender={{
                        sender_id: message.sender_id,
                    }} />
                ))}
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                gap="10px"
            >
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
                <button>
                    <EmojiIcon />
                </button>
                <button onClick={handleOnSendMessage}>
                    <SubmitIcon />
                </button>
            </Box>
        </Box>
    );
}

export default ChatWithUser;