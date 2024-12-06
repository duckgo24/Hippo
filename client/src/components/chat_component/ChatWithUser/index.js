import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Modal } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";
import RenderWithCondition from "../../RenderWithCondition";
import MessageChat from "../MessageChat";
import { EmojiIcon, GifIcon, ImageIcon, MoreIcon, SubmitIcon } from "../../SgvIcon";
import Loading from "../../Loading";
import { fetchGetAllMessages } from "../../../redux/slice/room-message.slice";
import GetLinkImage from "../../../utils/GetLinkImage";
import { useSocket } from "../../../providers/socket.provider";
import useHookMutation from "../../../hooks/useHookMutation";
import { ChatService } from "../../../services/ChatService";
import handleTime from "../../../utils/handleTime";
import Loader from "../../Loader";
import CallScreenWait from "../../call_component/CallScreenWait";



function ChatWithUser({ user_chat, onCallUser }) {
    const { my_account } = useSelector(state => state.account);
    const { room_list_message, is_loading_message } = useSelector(state => state.roomMessage);
    const { user, room_id } = user_chat;
    const [openEmoji, setOpenEmoji] = useState(false);
    const [myMessage, setMyMessage] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const dispatch = useDispatch();
    const imageInputRef = useRef();
    const socket = useSocket();

    useEffect(() => {
        dispatch(fetchGetAllMessages(room_id));
    }, [user_chat]);


    const handleOnChangeMyMessage = (e) => {
        setMyMessage(e.target.value);
    }

    const handleToggleEmoji = () => {
        setOpenEmoji(prev => !prev);
    }

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
    };

    const createMessageMutation = useHookMutation((data) => {
        return ChatService.createMessage(data);
    });

    const { isPending: isFetchCreateMessageLoading } = createMessageMutation;

    const handleSendMessage = () => {

        if (myMessage || imageUrl) {
            createMessageMutation.mutate({
                acc_id: my_account?.acc_id,
                receiver_id: user.acc_id,
                content: myMessage,
                video: "",
                image: imageUrl,
                seen: false,
                room_id
            }, {
                onSuccess: (data) => {
                    socket.emit("send-message", data);
                    setMyMessage("");
                    setImageUrl(null);
                }
            });
        }
    };

    const handleClickEmoji = (emojiObject) => {
        setMyMessage(prev => prev + emojiObject.emoji);
        setOpenEmoji(false);
    }


    return (
        <div className="flex flex-col h-screen gap-2">
            <Box display="flex" justifyContent="space-between" borderBottom="1px solid #ccc" padding="10px 0">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Avatar src={user?.avatar} alt={user?.avatar} />
                        {user?.isOnline && <div className="absolute bottom-0 right-1 h-3 w-3 bg-green-600 rounded-full"></div>}
                    </div>
                    <div>
                        <p className="text-base font-bold">{user?.full_name}</p>
                        {!user?.isOnline ? (
                            <p className="text-sm">
                                Đang hoạt động
                            </p>
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
                    <MoreIcon size={25} />
                </div>
            </Box>

            <div className="py-1 px-3 overflow-y-auto flex-1">
                <RenderWithCondition condition={is_loading_message}>
                    <Loading />
                </RenderWithCondition>
                <RenderWithCondition condition={room_list_message && room_list_message.length > 0}>
                    {
                        room_list_message
                        && room_list_message.map((message, index) => (
                            <MessageChat key={index} message={message} sender={message.message_sender} />
                        ))
                    }
                </RenderWithCondition>
            </div>
            <div className="flex flex-row items-center gap-2 relative mb-3">
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
                        color: '#000'
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
                            height: '400px'
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
                </div>
            </div>
        </div>
    );
}

export default ChatWithUser;
