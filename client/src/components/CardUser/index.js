import { Avatar, Box } from "@mui/material";
import { TickIcon } from "../SgvIcon";
import Paragraph from "../Paragraph";


function CardUser({ name, nickname, tick, avatar, size, status, lastOnline, onClick, ...props }) {
    return (
        <Box
            display='flex'
            flexDirection='row'
            gap='10px'
            alignItems='center'
            height='50px'
            maxWidth='200px'
            {...props}
            onClick={onClick}
        >

            <Box
                position="relative"
            >
                <Avatar
                    src={avatar} alt={name}
                    sx={{
                        width: size,
                        height: size,
                    }}
                />
                {
                    status === 'online'
                    &&
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#519B4A',
                    }}></div>
                }
            </Box>
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