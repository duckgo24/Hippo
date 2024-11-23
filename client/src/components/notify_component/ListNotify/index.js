

import { Box } from "@mui/material";
import Paragraph from "../../Paragraph";
import Notify from "../Notify";


function ListNotify({ listNotify }) {
    return (
        <Box height={'70vh'}>
            <Paragraph bold={600} size={24} style={{
                padding: '10px 20px'
            }}>
                Notification
            </Paragraph>
            <Paragraph bold={600} size={17} style={{
                padding: '0px 20px'
            }}>
                Early
            </Paragraph>
            <Box sx={{
                overflowY: 'auto',
                height: '60vh',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                marginTop: '10px'
            }}>
                {listNotify?.map((notify) => (
                    <Notify notify={notify} key={notify.notify_id} />
                ))}
            </Box>
        </Box>
    );
}

export default ListNotify;