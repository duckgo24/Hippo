import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { Divider, Modal } from '@mui/material';

import Paragraph from '../../components/Paragraph';
import CardUser from '../../components/CardUser';
import { MoreIcon, SearchIcon } from '../../components/SgvIcon';
import Input from '../../components/Input';
import CardChat from '../../components/chat_component/CardChat';
import ChatWithUser from '../../components/chat_component/ChatWithUser';

import { fetchGetAllRoom } from '../../redux/slice/room.slice';
import { useSocket } from '../../providers/socket.provider';
import Loading from '../../components/Loading';
import RenderWithCondition from '../../components/RenderWithCondition';
import { setCreateMessage } from '../../redux/slice/room-message.slice';
import CallScreen from '../../components/call_component/CallScreen';
import CallScreenWait from '../../components/call_component/CallScreenWait';

function Chat() {
    const { my_account } = useSelector((state) => state.account);
    const { rooms } = useSelector((state) => state.room);
    const [active, setActive] = useState(0);
    const [currentUserChat, setCurrentUserChat] = useState(null);
    const [isReceiveCall, setIsReceiveCall] = useState(false);
    const [userCall, setUserCall] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useSocket();

    const handleClickRoomChat = () => setActive(0);
    const handleClickRoomGroup = () => setActive(1);

    const handleOnClickCardChat = (user_chat, room_id) => {
        navigate(`/chat/${user_chat?.nickname}`);
        setCurrentUserChat({ room_id, user: user_chat });
        socket.emit('join-room', { room_id, acc_id: my_account?.acc_id });
    };

    const handleCallUser = () => {
        const width = 700;
        const height = 500;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;
        window.open(
            `/call/${currentUserChat?.user?.nickname}`,
            '_blank',
            `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`
        );
    };


    const handleCancelCall = () => {

    };

    const handleAcceptCall = () => {
       
        socket.emit('accept-call', { sender: userCall, receiver: my_account });


        const width = 700;
        const height = 500;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;
        window.open(
            `/call/${userCall?.nickname}`,
            '_blank',
            `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`
        );

        setIsReceiveCall(false);
        setUserCall(null);

    };

    const handleRefuseCall = () => {


    };

    const handleCloseCall = () => {


    };

    useEffect(() => {
        socket.on("receive-message", (data) => dispatch(setCreateMessage(data)));

        socket.on("receive-call", (data) => {
            setIsReceiveCall(true);
            setUserCall(data?.sender);
        });

        socket.on("receive-cancel-call", (data) => {
            setUserCall(null);
            setIsReceiveCall(false);
        });



        socket.on("receive-refuse-call", (data) => {
            console.log(data);

        });

        return () => {
            socket.off("receive-message");
            socket.off("receive-call");
            socket.off("receive-cancel-call");
            socket.off("receive-accept-call");
            socket.off("receive-refuse-call");
        };
    }, [socket, dispatch]);

    useEffect(() => {
        if (my_account?.acc_id) {
            dispatch(fetchGetAllRoom(my_account.acc_id));
        }
    }, [dispatch, my_account?.acc_id]);

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <div className="flex flex-col gap-3 h-full w-96 shadow-md">
                <div className='flex justify-between items-center px-5 pt-5'>
                    <CardUser nickname={my_account?.full_name} tick={my_account?.tick} avatar={my_account?.avatar} />
                    <Link to="/">
                        <MoreIcon />
                    </Link>
                </div>
                <Divider />
                <div className='px-5'>
                    <Input placeholder="Tìm kiếm đoạn chat người dùng" leftIcon={<SearchIcon />} />
                    <div className='flex flex-row gap-5'>
                        <button onClick={handleClickRoomChat} className={`max-w-fit px-7 py-2 mt-3 rounded-xl font-bold hover:bg-gray-100 cursor-pointer ${active === 0 && 'bg-slate-200'}`}>Hộp thư</button>
                        <button onClick={handleClickRoomGroup} className={`max-w-fit px-7 py-2 mt-3 rounded-xl font-bold hover:bg-gray-100 cursor-pointer ${active === 1 && 'bg-slate-200'}`}>Nhóm</button>
                    </div>
                </div>
                <RenderWithCondition>
                    <div className='px-5'>
                        <Loading />
                    </div>
                </RenderWithCondition>
                <div className='flex flex-col gap-2 overflow-y-auto pl-5'>
                    {rooms.map((room) => (
                        <CardChat
                            key={room.room_id}
                            room_id={room.room_id}
                            account={room.participants?.receiver}
                            newMessage={room.lastMessage?.[0]}
                            lastMessage={room.lastMessage}
                            selected={my_account?.acc_id === room?.participants?.receiver?.acc_id}
                            onClick={() => handleOnClickCardChat(room?.participants?.receiver, room.room_id)}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3 flex-1 shadow-md p-5 h-full">
                {currentUserChat ? (
                    <ChatWithUser user_chat={currentUserChat} onCallUser={handleCallUser} />
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <Paragraph>
                            Nhắn tin với
                            <Link className='underline text-blue-600' to={`/profile/${my_account?.nickname}`}> Bạn bè</Link>
                        </Paragraph>
                    </div>
                )}
            </div>


            <Modal
                open={isReceiveCall}
            >
                <div tabIndex="-1">
                    <CallScreenWait
                        sender={userCall}
                        receiver={my_account}
                        onAcceptCall={handleAcceptCall}
                        onRefuseCall={handleRefuseCall}
                    />
                </div>

            </Modal>

        </div>
    );
}

export default Chat;
