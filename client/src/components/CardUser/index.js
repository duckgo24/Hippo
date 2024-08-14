import { Avatar, Box } from "@mui/material";
import { TickIcon } from "../SgvIcon";
import Paragraph from "../paragraph";


function CardUser({ name, nickname, tick, avatar, ...props }) {
    return (
        <Box 
        display='flex'
        flexDirection='row'
        gap='10px'
        justifyContent='space-around'
        alignItems='center'
        height='50px'
        maxWidth='100px'
        >

            <Avatar src={avatar} alt={name} />

            <div>
                <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center' 
                    gap='5px'
                >
                    <Paragraph text={nickname} size='14px'  color="#000" bold='500' style={{
                        padding: 0
                    }} />
                    {tick && <TickIcon />}
                </Box>
                <Paragraph text={name} size='13px' color="#000" />
            </div>
        </Box>
    );
}

export default CardUser;