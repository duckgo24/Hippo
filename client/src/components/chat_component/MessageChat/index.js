import { useDispatch, useSelector } from 'react-redux';
import useHookMutation from '../../../hooks/useHookMutation';
import { Avatar, Divider, Modal, Popover } from '@mui/material';
import RenderWithCondition from '../../RenderWithCondition';
import EmojiHippo from '../../EmojiHippo';
import { MdInsertEmoticon } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import React from 'react';
import { FaHeart, FaRegSurprise, FaSmile, FaSmileBeam } from 'react-icons/fa';
import { FiSmile, FiPlusSquare } from 'react-icons/fi';
import { FaRegFaceSadCry } from 'react-icons/fa6';
import { LuAngry } from 'react-icons/lu';
import { BiLike } from 'react-icons/bi';
import { messageService } from '../../../services/MessageSevice';
import { setUpdateMessage, setUpdateMessageGroup } from '../../../redux/slice/message.slice';
import { FaEye } from 'react-icons/fa';
import { useSocket } from '../../../providers/socket.provider';

function MessageChat({ sender, message }) {
    const { my_account } = useSelector((state) => state.account);
    const [anchorElEmoji, setAnchorElEmoji] = React.useState(null);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalImage, setOpenModalImage] = React.useState(false);
    const [emojiMessage, setEmojiMessage] = React.useState(null);
    const dispatch = useDispatch();
    const socket = useSocket();
    const moods = [
        {
            name: 'heart',
            icon: <FaHeart color="red" size={15} />,
        },
        {
            name: 'smile',
            icon: <FiSmile size={15} />,
        },
        {
            name: 'surprise',
            icon: <FaRegSurprise size={15} />,
        },
        {
            name: 'sad',
            icon: <FaRegFaceSadCry size={15} />,
        },
        {
            name: 'angry',
            icon: <LuAngry size={15} />,
        },
        {
            name: 'like',
            icon: <BiLike size={15} />,
        },
    ];

    const updateMessageMutation = useHookMutation(({ message_id, data }) => {
        return messageService.updateMessage(message_id, data);
    });

    const handleClickEmojiHippo = (emojiName) => {
        setEmojiMessage(emojiName);
        updateMessageMutation.mutate(
            {
                message_id: message?.message_id,
                data: {
                    mood: emojiName,
                },
            },
            {
                onSuccess: (res) => {
                    const { message_id, data } = res;
                    dispatch(setUpdateMessage({ message_id, data }));
                    dispatch(setUpdateMessageGroup({ message_id, data }));
                    socket.emit('update-message', {
                        room_id: message.room_id,
                        message_id: message.message_id,
                        data: data
                    });
                },
            },
        );
        setAnchorElEmoji(null);
    };

    const handleDeleteMessage = () => {
        updateMessageMutation.mutate(
            {
                message_id: message?.message_id,
                data: {
                    is_deleted: true,
                },
            },
            {
                onSuccess: (res) => {
                    const { message_id, data } = res;
                    dispatch(setUpdateMessage({ message_id, data }));
                    dispatch(setUpdateMessageGroup({ message_id, data }));
                    setOpenModalDelete(false);
                    socket.emit('update-message', {
                        room_id: message.room_id,
                        message_id: message.message_id,
                        data: {
                            is_deleted: true,
                        },
                    });
                },
            },
        );
    };

    return (
        <div
            className={`flex ${
                my_account?.acc_id === sender?.acc_id ? 'justify-end' : 'justify-start'
            } mt-1 gap-3 relative`}
        >
            <RenderWithCondition condition={my_account?.acc_id !== sender?.acc_id && sender?.avatar}>
                <div className="relative group">
                    <Avatar src={sender?.avatar} alt={sender?.avatar} />
                    <p className="absolute top-full left-full hidden group-hover:block w-[100px] bg-gray-100 z-50 p-2 rounded shadow-lg">
                        {sender?.full_name}
                    </p>
                </div>
            </RenderWithCondition>
            <RenderWithCondition condition={message?.image}>
                <div className="group relative cursor-pointer" onClick={() => setOpenModalImage(true)}>
                    <img
                        src={message?.image}
                        alt={message?.image}
                        className="h-[200px] w-[200px] object-cover rounded-lg"
                    />
                    <div className="absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-black bg-opacity-50 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100">
                        <FaEye />
                        <p>Xem ngay</p>
                    </div>
                </div>
            </RenderWithCondition>
            <RenderWithCondition condition={message?.content && message?.is_deleted}>
                <div className="p-2 rounded-lg border border-solid border-gray-300">
                    <span>Tin nhắn đã bị thu hồi</span>
                </div>
            </RenderWithCondition>

            <RenderWithCondition condition={!sender?.acc_id}>
                <p className="text-sm text-gray-500 text-center w-full">{message?.content}</p>
            </RenderWithCondition>

            <RenderWithCondition condition={message?.content && !message?.is_deleted && sender?.acc_id}>
                <div className="flex flex-row gap-1 items-center group relative">
                    <div
                        className={`p-2 relative rounded-lg ${
                            my_account?.acc_id === sender?.acc_id ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                    >
                        <p className={` ${my_account?.acc_id === sender?.acc_id ? 'text-white' : 'text-black'}`}>
                            {message?.content}
                        </p>
                        {message.mood ? (
                            <span className="absolute -bottom-2 -right-1 flex items-center gap-1 rounded-full bg-white p-1">
                                {moods.find((m) => m.name === message.mood)?.icon}
                            </span>
                        ) : null}
                    </div>

                    <button
                        onClick={(e) => setAnchorElEmoji(e.currentTarget)}
                        className="hidden opacity-75 group-hover:block"
                    >
                        <MdInsertEmoticon size={22} />
                    </button>
                    {my_account?.acc_id === sender?.acc_id && (
                        <button
                            onClick={() => setOpenModalDelete(true)}
                            className="hidden opacity-75 group-hover:block"
                        >
                            <RiDeleteBinLine size={22} />
                        </button>
                    )}
                </div>
                <Popover open={anchorElEmoji} anchorEl={anchorElEmoji} onClose={() => setAnchorElEmoji(null)}>
                    <div className="flex flex-col">
                        <EmojiHippo onClick={handleClickEmojiHippo} />
                    </div>
                </Popover>

                <Modal
                    open={openModalDelete}
                    onClose={() => setOpenModalDelete(false)}
                    className="flex justify-center items-center"
                >
                    <div className="bg-white w-[500px] h-[auto] p-5 rounded-lg">
                        <p className="font-bold">Thu hồi tin nhắn</p>
                        <Divider />
                        <p className="text-base mt-2">
                            Tin nhắn này sẽ bị gỡ khỏi thiết bị của bạn, nhưng vẫn hiển thị với các thành viên khác
                            trong đoạn chat.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setOpenModalDelete(false)}
                                className="bg-gray-200 text-black rounded-lg p-2"
                            >
                                Hủy
                            </button>
                            <button onClick={handleDeleteMessage} className="bg-blue-500 text-white rounded-lg p-2">
                                Thu hồi
                            </button>
                        </div>
                    </div>
                </Modal>
            </RenderWithCondition>
            <Modal
                open={openModalImage}
                className="flex justify-center items-center bg-black-07"
                onClose={() => setOpenModalImage(false)}
            >
                <div className="w-9/12 h-9/12 bg-white">
                    <img src={message.image} alt={message.image} />
                </div>
            </Modal>
        </div>
    );
}

export default MessageChat;
