import { useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";
import Paragraph from "../../Paragraph";
<<<<<<< HEAD
import RenderWithCondition from "../../RenderWithCondition";
=======
>>>>>>> 29fc6b1... update future Chat



function MessageChat({ sender, message }) {
    const { my_account } = useSelector(state => state.account);

<<<<<<< HEAD
    console.log(message);

=======
>>>>>>> 29fc6b1... update future Chat
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: my_account?.id === sender?.id ? "flex-end" : "flex-start",
                marginTop: "6px",
                gap: "10px",
                position: "relative",
            }}
        >
<<<<<<< HEAD
            <RenderWithCondition condition={my_account?.id !== sender?.id}>
                <Avatar src={sender?.avatar} alt={sender?.avatar} />
            </RenderWithCondition>
            <RenderWithCondition condition={message?.image}>
                <img src={message?.image} alt={message?.image} style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "cover",
                }}/>
            </RenderWithCondition>
            <RenderWithCondition condition={message?.content} >
                <Paragraph
                    style={{
                        color: my_account?.id === sender?.id ? "#fff" : "#000",
                        padding: "8px",
                        borderRadius: "8px",
                        backgroundColor: my_account?.id === sender?.id ? "#0084ff" : "#e4e6eb",
                        wordBreak: "break-word",
                    }}>

                    {message?.content}
                </Paragraph>
            </RenderWithCondition>
=======
            {my_account?.id !== sender?.id && <Avatar src={sender?.avatar} alt={sender?.avatar} />}
            <Paragraph
                style={{
                    color: my_account?.id === sender?.id ? "#fff" : "#000",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: my_account?.id === sender?.id ? "#0084ff" : "#e4e6eb",
                    wordBreak: "break-word",
                }}>
                {message}
            </Paragraph>
>>>>>>> 29fc6b1... update future Chat
        </Box>
    );
}

export default MessageChat;