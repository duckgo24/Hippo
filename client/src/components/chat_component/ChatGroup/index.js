import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Divider, Modal, Popover } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import { FaPhoneAlt, FaTrashAlt } from 'react-icons/fa';
import { IoMdVideocam } from 'react-icons/io';
import RenderWithCondition from '../../RenderWithCondition';
import MessageChat from '../MessageChat';
import { EmojiIcon, GifIcon, ImageIcon, MoreIcon, SubmitIcon } from '../../SgvIcon';
import Loading from '../../Loading';
import {
    fetchGetAllMessageGroup,
    fetchGetAllMessages,
    setCreateMessage,
    setCreateMessageGroup,
} from '../../../redux/slice/message.slice';
import GetLinkImage from '../../../utils/GetLinkImage';
import { useSocket } from '../../../providers/socket.provider';
import useHookMutation from '../../../hooks/useHookMutation';
import { ChatService } from '../../../services/ChatService';
import handleTime from '../../../utils/handleTime';
import Loader from '../../Loader';
import { Link, useNavigate } from 'react-router-dom';
import { roomService } from '../../../services/RoomService';
import { fetchGetAllRoomGroup, setCreateRoomGroup, setDeleteUserFromRoom } from '../../../redux/slice/room.slice';
import { TiTrash } from 'react-icons/ti';
import { IoNavigateCircleOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';
import Alert from '../../Alert';

export default function ChatGroup({ room, onCallUser }) {
    const { my_account } = useSelector((state) => state.account);
    const { room_message_group, is_loading_message } = useSelector((state) => state.roomMessage);
    const [openEmoji, setOpenEmoji] = useState(false);
    const [myMessage, setMyMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [archorElMore, setArchorElMore] = useState(null);
    const [openModalParticipant, setOpenModalParticipant] = useState(false);
    const [notify, setNotify] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInputRef = useRef();
    const socket = useSocket();

    useEffect(() => {
        dispatch(
            fetchGetAllMessageGroup({
                room_id: room?.room_id,
                acc_id: my_account?.acc_id,
            }),
        );
    }, [room]);

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

    const handleClickEmoji = (emojiObject) => {
        setMyMessage((prev) => prev + emojiObject.emoji);
        setOpenEmoji(false);
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
                    receiver_id: null,
                    content: myMessage,
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
                        setMyMessage('');
                        setImageUrl(null);
                    },
                },
            );
        }
    };

    const checkUserIsExisted = () => {
        if (!room?.participants || !my_account) {
            return false;
        }

        const user = room.participants.find((p) => p.acc_id === my_account?.acc_id && !p.is_exited);

        return !!user;
    };

    const userExist = checkUserIsExisted();

    useEffect(() => {
        console.log(room);
        console.log(userExist);
    }, [room, userExist]);

    const handleCallUser = () => {
        const width = 700;
        const height = 500;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;

        room.participants.slice(1).forEach((p) => {
            socket.emit('call-user', {
                sender: my_account,
                receiver: p,
            });
            window.open(
                `/call-screen-sender/${p.acc_id}`,
                '_blank',
                `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no`,
            );
        });
    };

    const deleteUserFromRoomMutation = useHookMutation(({ room_id, user_id }) => {
        return roomService.deleteUserFromRoom(room_id, user_id);
    });

    const handleOutRoomGroup = (room, user, _type) => {
        deleteUserFromRoomMutation.mutate(
            {
                room_id: room.room_id,
                user_id: user.acc_id,
            },
            {
                onSuccess: (data) => {
                    //   dispatch(
                    //       setDeleteUserFromRoom({
                    //           room_id: room.room_id,
                    //           user: {
                    //               ...user,
                    //               ...data,
                    //           },
                    //       }),
                    //   );
                    _type === 'exit'
                        ? setNotify({
                              type: 'success',
                              title: 'Rời nhóm thành công',
                              message: `Bạn đã vừa rời nhóm ${room.name}`,
                          })
                        : setNotify({
                              type: 'success',
                              title: 'Thành công',
                              message: `Bạn đã vừa xóa ${user.full_name} khỏi nhóm ${room.name}`,
                          });

                    createMessageMutation.mutate(
                        {
                            acc_id: null,
                            receiver_id: null,
                            content:
                                _type === 'exit'
                                    ? `${user.full_name} đã rời khỏi nhóm`
                                    : `${user.full_name} đã bị xóa khỏi nhóm`,
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

                                socket.emit('user-out-group', {
                                    room_id: room.room_id,
                                    acc_id: user.acc_id,
                                });
                            },
                        },
                    );

                    setOpenModalParticipant(false);
                },
            },
        );
    };

    useEffect(() => {
        if (userExist) {
            // Lắng nghe sự kiện khi user vẫn còn trong nhóm
            socket.on('receive-message-group', (data) => {
                dispatch(setCreateMessageGroup(data.data));
            });

            socket.on('user-left-group', (data) => {
                dispatch(
                    setDeleteUserFromRoom({
                        room_id: room.room_id,
                        user: {
                            ...room.participants.find((p) => p.acc_id === data.acc_id),
                            is_exited: true,
                            is_receive_message: false,
                        },
                    }),
                );
            });

            return () => {
                socket.off('receive-message-group');
                socket.off('user-left-group');
            };
        } else {
            socket.off('receive-message-group');
            socket.off('user-left-group');
        }
    }, [socket, userExist]);
      const numMember = useMemo(() => 
                room?.participants.filter(p => !p.is_exited).length - 1
          ,[room?.participants]);

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
            <div className="flex gap-10 items-center justify-between border-b-2 border-solid border-gray-200 py-[10px]">
                <div className="flex gap-10 items-center">
                    <div className="flex -space-x-4  relative items-center">
                        <Avatar
                            alt="Remy Sharp"
                            src={room?.participants[0].avatar}
                            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                        />
                        <div className="absolute -bottom-1 right-1 h-3 w-3 border-whiteborder-2 border-solid bg-green-600 rounded-full z-50"></div>
                        <div className="absolute top-2 left-10 w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-sm font-medium text-gray-700 shadow-lg">
                            +{numMember}
                        </div>
                    </div>
                    <p className="font-bold text-xl">{room?.name}</p>
                </div>

                <div className="flex items-center gap-4 px-2">
                    <button onClick={handleCallUser}>
                        <FaPhoneAlt size={23} />
                    </button>
                    <button>
                        <IoMdVideocam size={27} />
                    </button>
                    <button>
                        <MoreIcon size={25} onClick={(e) => setArchorElMore(e.currentTarget)} />
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
                            <button
                                onClick={() => {
                                    setOpenModalParticipant(true);
                                    setArchorElMore(null);
                                }}
                                className="hover:underline"
                            >
                                Xem thành viên nhóm
                            </button>
                            <button className="hover:underline">Đổi tên nhóm</button>
                            <button className="hover:underline">Xóa nhóm</button>
                        </div>
                    </Popover>
                    <Modal
                        open={openModalParticipant}
                        onClose={() => setOpenModalParticipant(false)}
                        className="flex items-center justify-center"
                    >
                        <div className="w-[300px] bg-white p-5 rounded-lg">
                            <div className="mb-6">
                                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-90">
                                    Tên nhóm : {room?.name}
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        className={`hover:contents:${room.participants[0]?.full_name}`}
                                        src={room.participants[0]?.avatar}
                                        alt={room.participants[0]?.avatar}
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-start">{room.participants[0].full_name}</p>
                                        <p className="text-xs">Trưởng nhóm</p>
                                    </div>
                                </div>
                                <Link to={`/profile/${room.participants[0]?.nickname}`}>
                                    <IoNavigateCircleOutline size={25} className="hover:opacity-50" />
                                </Link>
                            </div>
                            <div>
                                <p className="text-lg font-bold mt-5">Thành viên</p>
                                <div className="flex flex-col gap-2 mt-3">
                                    {room.participants.slice(1).map((participant) => {
                                        if (participant?.is_exited) return null;
                                        return (
                                            <div
                                                key={participant?.acc_id}
                                                className="flex items-center justify-between mt-1"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Avatar
                                                        className={`hover:contents:${participant?.full_name}`}
                                                        src={participant?.avatar}
                                                        alt={participant?.avatar}
                                                    />
                                                    <div className="flex flex-col">
                                                        <p className="text-start">{participant.full_name}</p>
                                                        <p className="text-xs">Thành viên</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    {room.participants[0]?.acc_id === my_account?.acc_id && (
                                                        <button
                                                            onClick={() =>
                                                                handleOutRoomGroup(room, participant, 'delete')
                                                            }
                                                            className="hover:underline"
                                                        >
                                                            <TiTrash size={25} className="hover:opacity-50" />
                                                        </button>
                                                    )}
                                                    <Link to={`/profile/${participant?.nickname}`}>
                                                        <IoNavigateCircleOutline
                                                            size={25}
                                                            className="hover:opacity-50"
                                                        />
                                                    </Link>
                                                    {participant?.acc_id === my_account?.acc_id && (
                                                        <button
                                                            onClick={() =>
                                                                handleOutRoomGroup(room, participant, 'exit')
                                                            }
                                                            className="hover:underline"
                                                        >
                                                            <IoIosLogOut size={25} className="hover:opacity-50" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>

            <div className="y-1 px-3 overflow-y-auto flex-1">
                <RenderWithCondition condition={is_loading_message}>
                    <Loading />
                </RenderWithCondition>
                <RenderWithCondition condition={room_message_group && room_message_group.length > 0}>
                    {room_message_group &&
                        room_message_group.map((message, index) => (
                            <MessageChat key={index} message={message} sender={message.message_sender} />
                        ))}
                </RenderWithCondition>
            </div>

            <RenderWithCondition condition={userExist}>
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
                        style={{
                            padding: '10px 12px',
                            width: '100%',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            borderRadius: '20px',
                            outline: 'none',
                            color: '#000',
                        }}
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

            <RenderWithCondition condition={!userExist}>
                <Divider />
                <p className="text-center text-base text-gray-400">Bạn không còn trong nhóm này</p>
            </RenderWithCondition>

            {notify && <Alert type={notify?.type} title={notify?.title} message={notify?.message} />}
        </div>
    );
}
