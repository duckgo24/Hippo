import { Box, TextareaAutosize } from "@mui/material";
import CardUser from "../CardUser";
import Paragraph from "../Paragraph";
import HandleTime from "../../utils/handleTime";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { EmojiIcon, HealIcon, SubmitIcon } from "../SgvIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";


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
    tag: "admin",
    reply: 100,
    anwers: [
        {
            id: "123",
            content: "This is a answer",
            createdAt: "2023-01-01T10:00:00",
            account: {
                id: "123",
                nickname: "user3432",
                avatar: "https://example.com/avatar.jpg"
            }
        },
        {
            id: "124",
            content: "This is a answer 2 dgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdf",
            createdAt: "2023-01-01T10:00:00",
            account: {
                id: "123",
                nickname: "user3432",
                avatar: "https://example.com/avatar.jpg"
            }
        },
        {
            id: "125",
            content: "This is a answer 3",
            createdAt: "2023-01-01T10:00:00",
            account: {
                id: "123",
                nickname: "user3432",
                avatar: "https://example.com/avatar.jpg"
            }
        }
    ]
};

function Commemt({ comment }) {
    const [showReply, setShowReply] = useState(false);
    const [likeComment, setLikeComment] = useState(false);
    const handleLikeComment = () => {
        setLikeComment(!likeComment);
    }
    const handleShowReply = () => {
        setShowReply(!showReply);
    }

    return (
        <div>
            <Box
                display="grid"
                gridTemplateColumns="50% auto"
            >
                <CardUser nickname={fakeComment.account.nickname} name={fakeComment.account.name} avatar={fakeComment.account.avatar} tick={fakeComment.account.tick} />
                <Paragraph color="rgba(0, 0, 0, 0.7)" size="14px" >
                    {HandleTime(fakeComment.createdAt)}
                </Paragraph>
            </Box>
            <Box
                display="flex"
                padding="0 10px"
            >
                <Box>
                    <Box display="flex">
                        <Paragraph color="#000" size="14px" style={{
                            padding: " 0 0 0 20px",
                            flex: 1
                        }} >
                            <Link to={`/profile/${fakeComment.tag}`}>@{fakeComment.tag} </Link>
                            {fakeComment.content}
                        </Paragraph>
                        <button onClick={handleLikeComment}>
                            <HealIcon size={18} active={likeComment} />
                        </button>
                    </Box>
                    {fakeComment.reply > 0
                        &&
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap="15px"
                        >
                            <button onClick={handleShowReply}>
                                <Paragraph
                                    color="rgba(0, 0, 0, 0.7)"
                                    size="13px"
                                    bold="600"
                                    style={{
                                        padding: " 0 0 0 40px"
                                    }}
                                >
                                    {!showReply ? `━ Xem tất cả ${fakeComment.reply} phản hồi` : `━ Ẩn tất cả ${fakeComment.reply} phản hồi`}
                                </Paragraph>
                            </button>
                            <Loader size={17} />
                        </Box>
                    }
                    {fakeComment.anwers.length && showReply
                        &&
                        <Box
                            marginLeft="40px"
                        >
                            {fakeComment.anwers.map((answer) => {
                                return (
                                    <>
                                        <Box
                                            display="grid"
                                            gridTemplateColumns="65% auto"
                                            key={answer.id}
                                            marginTop="10px"
                                        >
                                            <CardUser nickname={fakeComment.account.nickname} name={fakeComment.account.name} avatar={fakeComment.account.avatar} tick={fakeComment.account.tick} size="28px" />
                                            <Paragraph text={HandleTime(fakeComment.createdAt)} color="rgba(0, 0, 0, 0.7)" size="14px" />
                                        </Box>
                                        <Paragraph color="#000" size="14px" style={{
                                            padding: " 0 10px 0 20x"
                                        }} >
                                            <Link to={`/profile/${answer.account.nickname}`}>@{answer.account.nickname} </Link>
                                            {answer.content}
                                        </Paragraph>
                                    </>

                                )
                            })}
                        </Box>

                    }
                </Box>



            </Box>
        </div>
    );
}

export default Commemt;