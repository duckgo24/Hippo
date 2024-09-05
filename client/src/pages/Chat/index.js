import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";


import { Box } from '@mui/material';
import Paragraph from '../../components/Paragraph'
import SocketService from '../../utils/SocketService';
import CardUser from '../../components/CardUser';
import CardChat from '../../components/CardChat';
import { MoreIcon, SearchIcon } from '../../components/SgvIcon';
import Input from '../../components/Input';
import ChatWithUser from '../../components/ChatWithUser';


function Chat() {
    const { my_account } = useSelector((state) => state.account);
    const [myMessage, setMyMessage] = useState();
    const [messages, setMessages] = useState([]);
    const { state } = useLocation();
    const [currentUser, setCurrentUser] = useState(state?.account ? state.account : null);


    return (
        <Box
            display="flex"
            flexDirection="row"
            height="100vh"
            overflow="hidden"
        >
            <Box
                height="100%"
                width="25%"
                display="flex"
                flexDirection="column"
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                gap="10px"
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    padding="20px 20px 0 20px"
                >

                    <CardUser nickname={my_account?.nickname} tick={my_account?.tick} avatar={my_account?.avatar} />
                    <Box>
                        <Link to="/">
                            <MoreIcon />
                        </Link>
                    </Box>
                </Box>
                <Box
                    padding="0 20px"
                >
                    <Input placeholder="Tìm kiếm đoạn chat người dùng" leftIcon={<SearchIcon />} />
                    <Paragraph style={{
                        padding: "5px 10px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        width: "80px",
                        bgColor: "red",
                        marginTop: "10px",
                    }}>
                        Hộp thư
                    </Paragraph>
                </Box>

                {/* Đoạn chat */}
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="5px"
                    sx={{
                        overflowY: "auto",
                        paddingLeft: "20px"
                    }}

                >

                </Box>

            </Box>
            <Box
                height="100%"
                flex={1}
                display="flex"
                flexDirection="column"
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                gap="10px"
                padding="20px"
            >
                <ChatWithUser receiver={currentUser} />
            </Box>

        </Box>
    );
}

export default Chat;