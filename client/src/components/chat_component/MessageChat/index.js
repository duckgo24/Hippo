import { useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";
import Paragraph from "../../Paragraph";



function MessageChat({ sender, message }) {
    const { my_account } = useSelector(state => state.account);

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
        </Box>
    );
}

export default MessageChat;