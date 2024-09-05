import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Paragraph from "../Paragraph";

function MessageChat({ sender, message }) {
    const { my_account } = useSelector(state => state.account);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: my_account?.id === sender?.sender_id ? "flex-end" : "flex-start" }}>
                <Paragraph>
                    {message}
                </Paragraph>
            </Box>


        </Box>
    );
}

export default MessageChat;