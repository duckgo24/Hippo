import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

import CardUser from '../../components/CardUser';
import { MoreIcon, SearchIcon } from '../../components/SgvIcon';
import Input from '../../components/Input';
import CardChat from '../../components/chat_component/CardChat';
import ChatWithUser from '../../components/chat_component/ChatWithUser';
import {
    fetchGetAllRoom,
    fetchGetAllRoomGroup,
    setAddUserToRoom,
    setCurrentRoom,
    setCurrentRoomGroup,
} from '../../redux/slice/room.slice';
import { useSocket } from '../../providers/socket.provider';
import Loading from '../../components/Loading';
import RenderWithCondition from '../../components/RenderWithCondition';
import CardChatGroup from '../../components/chat_component/CardChatGroup';
import ChatGroup from '../../components/chat_component/ChatGroup';
import { accountService } from '../../services/AccountService';
import useHookMutation from '../../hooks/useHookMutation';
import { setUpdateMyAccount } from '../../redux/slice/account.slice';
import { setUpdateMessage, setUpdateMessageGroup } from '../../redux/slice/message.slice';

function Chat() {
    const { my_account } = useSelector((state) => state.account);
    const { rooms, rooms_group, is_loading_room, current_room_group, current_room } = useSelector(
        (state) => state.room,
    );
    const [tabChat, setTabChat] = useState(0);
    const [currentUserChat, setCurrentUserChat] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useSocket();

    const handleClickRoomChat = () => setTabChat(0);
    const handleClickRoomGroup = () => setTabChat(1);

    const handleOnClickCardChat = (user_chat, sender, room_id) => {
        navigate(`/chat/${user_chat?.nickname}`);
        setCurrentUserChat({ room_id, user: user_chat, sender });
        dispatch(
            setCurrentRoom({
                room_id,
                user: user_chat,
                sender,
            }),
        );
        dispatch(setCurrentRoomGroup(null));
        socket.emit('join-room', { room_id, acc_id: my_account?.acc_id });
    };

    const handleClickCardChatGroup = (room) => {
        navigate(`/chat/room_id=${room?.room_id}`);
        dispatch(setCurrentRoomGroup(room));
        dispatch(setCurrentRoom(null));
    };

    const handleCallUser = () => {
        const width = 700;
        const height = 500;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;

        socket.emit('call-user', {
            sender: my_account,
            receiver: current_room.user,
        });

        window.open(
            `/call-screen-sender/${current_room.user?.nickname}`,
            '_blank',
            `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`,
        );
    };

    useEffect(() => {
        async function a() {
            if (tabChat === 0) {
                await dispatch(fetchGetAllRoom(my_account?.acc_id));
                // rooms.forEach((room) => {
                //     socket.emit('join-room', { room_id: room.room_id, acc_id: my_account?.acc_id });
                // });
            }

            if (tabChat === 1) {
                await dispatch(fetchGetAllRoomGroup(my_account?.acc_id));
                rooms_group.forEach((room) => {
                    socket.emit('join-room-group', { room_id: room.room_id, acc_id: my_account?.acc_id });
                });
            }
        }
        a();
    }, [tabChat]);

    useEffect(() => {
        let callWindow = null;

        socket.on('user-join-group', (data) => {
            dispatch(
                setAddUserToRoom({
                    room_id: data.room_id,
                    user: data.receiver,
                }),
            );
        });

        socket.on('user-update-message', (data) => {
            dispatch(
                setUpdateMessage({
                    message_id: data.message_id,
                    data: data.data,
                }),
            );

            dispatch(
                setUpdateMessageGroup({
                    message_id: data.message_id,
                    data: data.data,
                }),
            );
        });

        socket.on('receive-message', (data) => {
            setNewMessage(data.data);
            console.log(data);
        });

        socket.on('receive-call', (data) => {
            if (data && !callWindow) {
                const width = 700;
                const height = 500;
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;
                const left = screenWidth - width;
                const top = (screenHeight - height) / 2;

                callWindow = window.open(
                    `/call-screen-receiver/${data.sender.nickname}`,
                    '_blank',
                    `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`,
                );

                callWindow.onbeforeunload = () => {
                    callWindow = null;
                };
            }
        });

        window.onload = () => {
            dispatch(setCurrentRoom(null));
            dispatch(setCurrentRoomGroup(null));
        };

        

        return () => {
            socket.off('receive-message');
            socket.off('receive-call');
            socket.off('user-join-group');
            socket.off('user-update-message');
        };
    }, [socket, dispatch]);

    const updateAccountMutation = useHookMutation(({ acc_id, data }) => {
        return accountService.UpdateAccount(acc_id, data);
    });
    useEffect(() => {
        updateAccountMutation.mutate(
            { acc_id: my_account?.acc_id, data: { isOnline: true } },
            {
                onSuccess: (data) => {
                    dispatch(setUpdateMyAccount(data));
                },
            },
        );
    }, []);

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <div className="flex flex-col gap-3 h-full w-96 shadow-md">
                <div className="flex justify-between items-center px-5 pt-5">
                    <CardUser nickname={my_account?.full_name} tick={my_account?.tick} avatar={my_account?.avatar} />
                    <Link to="/">
                        <MoreIcon />
                    </Link>
                </div>
                <Divider />
                <div className="px-5">
                    <Input placeholder="Tìm kiếm đoạn chat người dùng" leftIcon={<SearchIcon />} />
                    <div className="flex flex-row gap-5">
                        <button
                            onClick={handleClickRoomChat}
                            className={`max-w-fit px-7 py-2 mt-3 rounded-xl font-bold hover:bg-gray-100 cursor-pointer ${
                                tabChat === 0 && 'bg-slate-200'
                            }`}
                        >
                            Hộp thư
                        </button>
                        <button
                            onClick={handleClickRoomGroup}
                            className={`max-w-fit px-7 py-2 mt-3 rounded-xl font-bold hover:bg-gray-100 cursor-pointer ${
                                tabChat === 1 && 'bg-slate-200'
                            }`}
                        >
                            Nhóm
                        </button>
                    </div>
                </div>
                <RenderWithCondition condition={is_loading_room}>
                    <div className="px-5">
                        <Loading />
                    </div>
                </RenderWithCondition>

                <RenderWithCondition condition={tabChat === 0 && !is_loading_room}>
                    <div className="flex flex-col gap-2 overflow-y-auto pl-5">
                        {rooms.map((room) => (
                            <CardChat
                                key={room.room_id}
                                room_id={room.room_id}
                                account={room.participants?.receiver}
                                newMessage={room.room_id === newMessage?.room_id ? newMessage : null}
                                lastMessage={room.lastMessage}
                                selected={my_account?.acc_id === room?.participants?.receiver?.acc_id}
                                onClick={() =>
                                    handleOnClickCardChat(
                                        room?.participants?.receiver,
                                        room?.participants?.sender,
                                        room.room_id,
                                    )
                                }
                            />
                        ))}
                    </div>
                </RenderWithCondition>

                <RenderWithCondition condition={tabChat === 1 && !is_loading_room}>
                    {rooms_group &&
                        rooms_group.map((room) => (
                            <CardChatGroup
                                key={room.room_id}
                                rooms_group={room}
                                onClick={() => handleClickCardChatGroup(room)}
                            />
                        ))}
                </RenderWithCondition>
            </div>

            {current_room && (
                <div className="flex flex-col gap-3 flex-1 shadow-md h-full">
                    <ChatWithUser user_chat={current_room} sender={my_account} onCallUser={handleCallUser} />
                </div>
            )}

            {current_room_group && (
                <div className="flex flex-col gap-3 flex-1 shadow-md h-full">
                    <ChatGroup room={current_room_group} />
                </div>
            )}

            {!current_room_group && !currentUserChat && (
                <div className="flex flex-1 items-center justify-center h-full">
                    <p>
                        Nhắn tin với
                        <Link className="underline text-blue-600 ml-2" to={`/profile/${my_account?.nickname}`}>
                            Bạn bè
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Chat;
