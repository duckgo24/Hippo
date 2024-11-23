import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from '@mui/material';


import Paragraph from '../../components/Paragraph';
import CardUser from '../../components/CardUser';
import { MoreIcon, SearchIcon } from '../../components/SgvIcon';
import Input from '../../components/Input';
import CardChat from '../../components/chat_component/CardChat';
import ChatWithUser from '../../components/chat_component/ChatWithUser';

import { fetchGetAllRoom } from '../../redux/slice/room.slice';
import { useSocket } from '../../providers/socket.provider';


function Chat() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locationState = useLocation().state;
    const socket = useSocket()

    const { my_account } = useSelector((state) => state.account);
    const { rooms } = useSelector((state) => state.room);

    const [currentUser, setCurrentUser] = useState({
        user: locationState?.account || null,
        room_id: locationState?.room_id || null,
    });
    const [lastMessage, setLastMessage] = useState(null);
    const [cardChats, setCardChats] = useState(rooms);

    const prevUserRef = useRef();


    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setLastMessage(data);

            setCardChats((prev) => {
                const updatedChats = prev.map((chat) => {
                    if (chat?.participants?.receiver?.id === data?.receiver?.id && chat?.room_id === data?.room_id) {
                        return { ...chat, content: data.content, created_at: data.created_at, hasNewMessage: true };
                    }
                    return chat;
                });
                return updatedChats.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            });
        };

        socket.on('receive-message', handleReceiveMessage);

        return () => socket.off('receive-message', handleReceiveMessage);
    }, [socket]);


    useEffect(() => {
        if (my_account?.id) {
            dispatch(fetchGetAllRoom({ acc_id: my_account.id }));
        }
    }, [dispatch, my_account]);


    useEffect(() => {
        prevUserRef.current = currentUser;
    }, [currentUser]);

    const handleOnClickCardChat = useCallback((user, room_id) => {
        const prevUser = prevUserRef.current?.user;

        if (prevUser?.id !== user?.id) {
            socket.emit('left-room', { username: prevUser?.nickname, room_id: prevUserRef.current?.room_id });
        }

        socket.emit('join-room', { room_id, username: my_account?.nickname });
        setCurrentUser({ user, room_id });
        navigate(`/chat/${user?.nickname}`);

        setCardChats((prev) =>
            prev.map((chat) => chat?.participants?.receiver?.id === user?.id ? { ...chat, hasNewMessage: false } : chat)
        );
    }, [my_account?.nickname, navigate]);


    return (
        <Box display="flex" flexDirection="row" height="100vh" overflow="hidden">
            <Box
                height="100%"
                width="25%"
                display="flex"
                flexDirection="column"
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                gap="10px"
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="20px 20px 0 20px">
                    <CardUser nickname={my_account?.full_name} tick={my_account?.tick} avatar={my_account?.avatar} />
                    <Box>
                        <Link to="/">
                            <MoreIcon />
                        </Link>
                    </Box>
                </Box>
                <Box padding="0 20px">
                    <Input placeholder="Tìm kiếm đoạn chat người dùng" leftIcon={<SearchIcon />} />
                    <Paragraph style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "10px", width: "80px", marginTop: "10px" }}>
                        Hộp thư
                    </Paragraph>
                </Box>
                <Box display="flex" flexDirection="column" gap="5px" sx={{ overflowY: "auto", paddingLeft: "20px" }}>
                    {cardChats.map((card, index) => (
                        <CardChat
                            key={index}
                            room_id={card?.room_id}
                            account={card?.participants?.receiver}
                            newMessage={lastMessage?.room_id === card?.room_id ? lastMessage : null}
                            lastMessage={card.lastMessage ? card?.lastMessage[0] : null}
                            selected={currentUser?.user?.id === card?.participants?.receiver?.id}
                            hasNewMessage={card?.hasNewMessage}
                            onClick={() => handleOnClickCardChat(card?.participants?.receiver, card?.room_id)}
                        />
                    ))}
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
                {currentUser?.user && currentUser?.room_id ? (
                    <ChatWithUser user_chat={currentUser} />
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Paragraph>
                            Nhắn tin với
                            <Link to={`/profile/${my_account?.nickname}`}>Bạn bè</Link>
                        </Paragraph>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Chat;
