import { Avatar, Box } from "@mui/material";
import { TickIcon } from "../SgvIcon";
import Paragraph from "../Paragraph";


function CardUser({ name, nickname, tick, avatar, size, ...props }) {
    return (
        <Box
            display='flex'
            flexDirection='row'
            gap='10px'
            justifyContent='space-around'
            alignItems='center'
            height='50px'
            maxWidth='100px'
            {...props}
        >

            <Avatar src={avatar} alt={name} sx={{
                width: size,
                height: size,
            }} />

            <div>
                <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    gap='5px'
                >
                    {nickname &&
                        <Paragraph size='14px' color="#000" bold='500' style={{
                            padding: 0
                        }} >
                            {nickname}
                        </Paragraph>
                    }
                    {tick && <TickIcon />}
                </Box>
                {name && <Paragraph size='13px' color="#000" >{name}</Paragraph>}
            </div>
        </Box>
    );
}

export default CardUser;