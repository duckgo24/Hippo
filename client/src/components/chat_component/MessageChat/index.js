import { useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";
import Paragraph from "../../Paragraph";
import RenderWithCondition from "../../RenderWithCondition";



function MessageChat({ sender, message }) {
    const { my_account } = useSelector(state => state.account);

    console.log(message);

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
        </Box>
    );
}

export default MessageChat;