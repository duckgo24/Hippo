import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Modal, Popover } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import { FaPhoneAlt } from 'react-icons/fa';
import { IoMdVideocam } from 'react-icons/io';
import RenderWithCondition from '../../RenderWithCondition';
import Alert from '../../Alert';
import MessageChat from '../MessageChat';
import { EmojiIcon, GifIcon, ImageIcon, MoreIcon, PlusIcon, SubmitIcon } from '../../SgvIcon';
import Loading from '../../Loading';
import { fetchGetAllMessages, setCreateMessage } from '../../../redux/slice/message.slice';
import GetLinkImage from '../../../utils/GetLinkImage';
import { useSocket } from '../../../providers/socket.provider';
import useHookMutation from '../../../hooks/useHookMutation';
import { ChatService } from '../../../services/ChatService';
import handleTime from '../../../utils/handleTime';
import Loader from '../../Loader';
import { useNavigate } from 'react-router-dom';
import { roomService } from '../../../services/RoomService';
import { setAddUserToRoom, setCreateRoomGroup } from '../../../redux/slice/room.slice';
import { create } from '@mui/material/styles/createTransitions';

function ChatWithUser({ user_chat, sender, onCallUser }) {
    const { my_account } = useSelector((state) => state.account);
    const { rooms_group } = useSelector((state) => state.room);
    const { room_list_message, is_loading_message } = useSelector((state) => state.roomMessage);
    const { user, room_id } = user_chat;
    const [openEmoji, setOpenEmoji] = useState(false);
    const [myMessage, setMyMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [archorElMore, setArchorElMore] = useState(null);
    const [nameGroup, setNameGroup] = useState('');
    const [openAddGroup, setOpenAddGroup] = useState(false);
    const [openGroup, setOpenGroup] = useState(false);
    const [notify, setNotify] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInputRef = useRef();
    const socket = useSocket();

    useEffect(() => {
        dispatch(fetchGetAllMessages(room_id));
    }, [user_chat]);

    const handleOnChangeMyMessage = (e) => {
        setMyMessage(e.target.value);
    };

    const handleToggleEmoji = () => {
        setOpenEmoji((prev) => !prev);
    };

    const handleOnChooseImage = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const getImageUrl = async (e) => {
        const url = await GetLinkImage(e.target.files[0]);
        if (url) {
            setImageUrl(url);
        }
    };

    const createMessageMutation = useHookMutation((data) => {
        return ChatService.createMessage(data);
    });

    const { isPending: isFetchCreateMessageLoading } = createMessageMutation;

    const handleSendMessage = () => {
        if (myMessage || imageUrl) {
            createMessageMutation.mutate(
                {
                    acc_id: my_account?.acc_id,
                    receiver_id: user.acc_id,
                    content: myMessage,
                    video: '',
                    image: imageUrl,
                    seen: false,
                    room_id,
                },
                {
                    onSuccess: (data) => {
                        socket.emit('send-message', {
                            room_id,
                            data,
                        });
                        setMyMessage('');
                        setImageUrl(null);
                    },
                },
            );
        }
    };
    useEffect(() => {
        socket.on('receive-message', (data) => {
            dispatch(setCreateMessage(data.data));
        });

        return () => {
            socket.off('receive-message');
        };
    }, [socket]);

    const addRoomGroupMutation = useHookMutation((data) => {
        return roomService.createRoomGroup(data);
    });

    const handleAddGroup = () => {
        if (nameGroup) {
            addRoomGroupMutation.mutate(
                {
                    owner_id: my_account.acc_id,
                    name: nameGroup,
                    users: [my_account, user],
                },
                {
                    onSuccess: (data) => {
                        setCreateRoomGroup(data);
                        setNotify({
                            type: 'success',
                            title: 'Tạo nhóm thành công',
                            message: 'Nhóm đã được tạo thành công',
                        });
                        setOpenAddGroup(false);
                    },
                },
            );
        }
    };

    const addUserToRoomMutation = useHookMutation(({ room_id, user }) => {
        return roomService.addUserToRoom(room_id, user);
    });

    const handleAddUserToRoom = (room) => {
        addUserToRoomMutation.mutate(
            {
                room_id: room.room_id,
                user: user,
            },
            {
                onSuccess: () => {
                    setAddUserToRoom(user);
                    setNotify({
                        type: 'success',
                        title: 'Thêm vào nhóm',
                        message: `Đã thêm ${user.full_name} vào nhóm ${room.name}`,
                    });

                    setOpenGroup(false);

                    createMessageMutation.mutate(
                        {
                            acc_id: null,
                            receiver_id: null,
                            content: `${my_account?.full_name} đã thêm ${user.full_name} vào nhóm`,
                            video: null,
                            image: imageUrl,
                            seen: false,
                            room_id: room?.room_id,
                        },
                        {
                            onSuccess: (data) => {
                                socket.emit('send-message-group', {
                                    room_id: room?.room_id,
                                    data,
                                });
                            },
                        },
                    );

                    socket.emit('add-user-to-group', {
                        room_id: room?.room_id,
                        sender: my_account?.acc_id,
                        receiver: {
                            ...user,
                            is_receive_message: true,
                            is_exited: false,
                        },
                    });
                },
                onError: (data) => {
                    console.log(data);

                    setNotify({
                        type: 'error',
                        title: 'Thêm vào nhóm',
                        message: `${user.full_name} đã ở trong nhóm ${room.name}`,
                    });
                },
            },
        );
    };

    const handleClickEmoji = (emojiObject) => {
        setMyMessage((prev) => prev + emojiObject.emoji);
        setOpenEmoji(false);
    };

    useEffect(() => {
        let timer;
        if (notify) {
            timer = setTimeout(() => {
                setNotify(null);
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [notify]);

    return (
        <div className="flex flex-col h-screen gap-2 p-5 pb-3">
            <div className="flex justify-between border-b-2 border-solid border-gray-200 py-2">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Avatar src={user?.avatar} alt={user?.avatar} />
                        {user?.isOnline && (
                            <div className="absolute bottom-0 right-1 h-3 w-3 bg-green-600 rounded-full"></div>
                        )}
                    </div>
                    <div>
                        <p className="text-base font-bold">{user?.full_name}</p>
                        {user?.isOnline ? (
                            <p className="text-sm">Đang hoạt động</p>
                        ) : (
                            <p className="text-sm"> Hoạt động {handleTime(user?.lastOnline)}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4 px-2">
                    <button onClick={() => onCallUser(user)}>
                        <FaPhoneAlt size={23} />
                    </button>
                    <button onClick={() => onCallUser(user)}>
                        <IoMdVideocam size={27} />
                    </button>
                    <button onClick={(e) => setArchorElMore(e.currentTarget)}>
                        <MoreIcon size={25} />
                    </button>
                    <Popover
                        open={archorElMore}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        anchorEl={archorElMore}
                        onClose={() => setArchorElMore(null)}
                    >
                        <div className="flex flex-col p-3 items-start text-lg">
                            <button onClick={() => navigate(`/profile/${user?.nickname}`)} className="hover:underline">
                                Xem trang cá nhân
                            </button>
                            <button onClick={() => setOpenAddGroup(true)} className="hover:underline">
                                Tạo nhóm
                            </button>
                            <button onClick={() => setOpenGroup(true)} className="hover:underline">
                                Thêm vào nhóm
                            </button>
                            <button className="hover:underline">Chặn người dùng</button>
                        </div>
                    </Popover>

                    <Modal
                        open={openAddGroup}
                        onClose={() => setOpenAddGroup(false)}
                        className="flex items-center justify-center"
                    >
                        <div className="w-[300px] bg-white p-5 rounded-lg">
                            <div className="mb-6">
                                <label for="default-input" className="block mb-2 text-sm font-medium text-gray-90">
                                    Tên nhóm
                                </label>
                                <input
                                    id="default-input"
                                    type="text"
                                    onChange={(e) => setNameGroup(e.target.value)}
                                    className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                                />
                            </div>
                            <div>
                                <p>Trưởng nhóm</p>
                                <Avatar
                                    className={`hover:contents:${my_account?.full_name}`}
                                    src={my_account?.avatar}
                                    alt={my_account?.avatar}
                                />
                            </div>
                            <div className="mt-4 flex items-start flex-col">
                                <p>Thành viên</p>
                                <Avatar src={user?.avatar} alt={user?.avatar} />
                            </div>
                            <div className="mt-2 flex items-end flex-col">
                                <button
                                    onClick={handleAddGroup}
                                    disabled={!nameGroup}
                                    className="bg-blue-500 text-white px-3 py-2 rounded-lg mt-3 hover:bg-blue-300 hover:cursor-pointer"
                                >
                                    Tạo nhóm
                                </button>
                            </div>
                        </div>
                    </Modal>

                    <Modal
                        open={openGroup}
                        className="flex justify-center items-center"
                        onClose={() => setOpenGroup(false)}
                    >
                        <div tabIndex={-1}>
                            <div className="bg-white p-5 rounded-lg w-[500px] h-auto">
                                <div>
                                    <p className="text-lg font-bold">Danh sách nhóm</p>
                                    {rooms_group &&
                                        rooms_group.map((room) => (
                                            <div className="flex items-center justify-between gap-2 p-2 border-b-2 border-solid border-gray-200">
                                                <p>{room?.name}</p>
                                                <button
                                                    onClick={() => handleAddUserToRoom(room)}
                                                    className="hover:opacity-65"
                                                >
                                                    <PlusIcon />
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>

            <div className="py-1 px-3 overflow-y-auto flex-1">
                <RenderWithCondition condition={is_loading_message}>
                    <Loading />
                </RenderWithCondition>
                <RenderWithCondition condition={room_list_message && room_list_message.length > 0}>
                    {room_list_message &&
                        room_list_message.map((message, index) => (
                            <MessageChat key={index} message={message} sender={message.message_sender} />
                        ))}
                </RenderWithCondition>
            </div>
            <RenderWithCondition condition={user?.is_receive_message}>
                <div className="flex flex-row items-center gap-2 relative">
                    <button onClick={handleOnChooseImage}>
                        <ImageIcon />
                        <input type="file" style={{ display: 'none' }} ref={imageInputRef} onChange={getImageUrl} />
                    </button>
                    <button>
                        <GifIcon />
                    </button>
                    <input
                        placeholder="Aa"
                        className="px-3 py-2 w-full text-base text-black rounded-lg border border-solid border-gray-300"
                        value={myMessage}
                        onChange={handleOnChangeMyMessage}
                    />
                    <button onClick={handleToggleEmoji}>
                        <EmojiIcon />
                    </button>

                    <RenderWithCondition condition={openEmoji}>
                        <EmojiPicker
                            style={{
                                position: 'absolute',
                                bottom: '40px',
                                right: '5%',
                                zIndex: '1000',
                                width: '300px',
                                height: '400px',
                            }}
                            onEmojiClick={handleClickEmoji}
                            lazyLoadEmojis={true}
                        />
                    </RenderWithCondition>

                    <RenderWithCondition condition={(myMessage || imageUrl) && !isFetchCreateMessageLoading}>
                        <button onClick={handleSendMessage}>
                            <SubmitIcon />
                        </button>
                    </RenderWithCondition>
                    <RenderWithCondition condition={isFetchCreateMessageLoading}>
                        <Loader size={25} />
                    </RenderWithCondition>

                    <div className="absolute bottom-full left-3 z-50 flex flex-row items-center gap-2">
                        <RenderWithCondition condition={imageUrl}>
                            <img
                                src={imageUrl}
                                alt={'image-send'}
                                style={{
                                    border: '1px solid rgba(0, 0, 0, 0.6)',
                                    padding: '2px 3px',
                                    borderRadius: '50%',
                                    width: '62px',
                                    height: '60px',
                                }}
                            />
                            <button
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '0',
                                    padding: '6px 10px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(218, 215, 215, 0.7)',
                                    color: '#000',
                                }}
                                onClick={() => setImageUrl(null)}
                            >
                                X
                            </button>
                        </RenderWithCondition>
                    </div>
                </div>
            </RenderWithCondition>
            <RenderWithCondition condition={user?.is_receive_message === false}>
                {my_account?.acc_id === sender?.acc_id ? (
                    <div className="flex flex-col items-center">
                        <p className="text-gray-400">Bạn đã chặn người dùng này.</p>
                        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600">
                            Bỏ chặn
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-gray-400">Người dùng đã chặn bạn.</div>
                )}
            </RenderWithCondition>

            {notify && <Alert type={notify?.type} title={notify?.title} message={notify?.message} />}
        </div>
    );
}

export default ChatWithUser;
