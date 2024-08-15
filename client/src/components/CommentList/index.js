import { Box, TextareaAutosize } from "@mui/material";
import CardUser from "../CardUser";
import Paragraph from "../Paragraph";
import HandleTime from "../../utils/handleTime";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { EmojiIcon, SubmitIcon } from "../SgvIcon";
import { useState } from "react";
import Commemt from "../Comment";


const fakeComment = {
    id: "123",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: "2023-01-01T10:00:00",
    account: {
        id: "123",
        nickname: "user3432",
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
        tick: true
    },
    tag: "@admin",
    anwers: [
        {
            id: "123",
            content: "This is a answer",
            createdAt: "2023-01-01T10:00:00",
            account: {
                id: "123",
                name: "John Doe",
                avatar: "https://example.com/avatar.jpg"
            }
        }
    ]
};

function CommentList({ data }) {

    const [myComment, setMyComment] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showReply, setShowReply] = useState(false);

    const iggleChar = ["súc vật", "sủa", "đcm"]


    const handleWriteComment = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length > 100) {
            return;
        }

        let filteredValue = inputValue;
        for (const word of iggleChar) {
            if (inputValue.includes(word)) {
                filteredValue = filteredValue.replace(word, "****");
            }
        }

        setMyComment(filteredValue);
    };

    const handleOnClickEmoji = (emoji) => {
        setMyComment(prev => prev + emoji.emoji);
        setShowEmojiPicker(false);
    }

    const handleShowEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    return (
        <Box>
            <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                maxHeight="300px"
                width="100%"
                sx={{
                    overflowY:"scroll",
                }}
            >
                <Commemt />
                <Commemt />
                <Commemt />
                <Commemt />

            </Box>
            <Box
                display="flex"
                padding="0 10px"
                justifyContent="space-between"
                alignItems="center"
                gap="5px"
                border='1px solid rgba(0, 0, 0, 0.1)'
                borderRadius='20px'
                position='relative'
            >
                <CardUser avatar={fakeComment.account.avatar} size="26px" style={{
                    height: "40px",
                }} />
                <TextareaAutosize
                    style={{
                        width: '100%',
                        fontSize: '14px',
                        border: 'none',
                        outline: 'none',
                        borderRadius: '5px',
                        padding: '4px 8px',
                    }}
                    value={myComment}
                    onChange={handleWriteComment}
                />
                <button onClick={handleShowEmojiPicker}>
                    <EmojiIcon />
                </button>
                {
                    myComment.length > 0 && myComment
                    &&
                    <button>
                        <SubmitIcon />
                    </button>
                }
                <EmojiPicker
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '100%',
                        zIndex: 1000,
                        width: '300px',
                        height: '250px'
                    }}
                    searchDisabled={true}
                    suggestedEmojisMode="none"
                    open={showEmojiPicker}
                    onEmojiClick={handleOnClickEmoji}
                    lazyLoadEmojis={true}
                />
            </Box>

        </Box>
    );
}

export default CommentList;