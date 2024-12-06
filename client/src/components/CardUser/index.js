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

            <div className="relative">
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
            </div>
            <div>
                <div className="flex flex-row items-center gap-2">
                    {nickname &&
                        <Paragraph size='14px' color="#000" bold='500' style={{
                            padding: 0
                        }} >
                            {nickname}
                        </Paragraph>
                    }
                    {tick && <TickIcon />}
                </div>
                {name && <Paragraph size='13px' color="#000" >{name}</Paragraph>}
            </div>
        </Box>
    );
}

export default CardUser;