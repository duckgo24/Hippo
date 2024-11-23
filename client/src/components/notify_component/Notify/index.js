import React from 'react';
import { Box } from "@mui/material";
import logo from '../../../images/logo.png';
import Paragraph from '../../Paragraph';
import RenderWithCondition from '../../RenderWithCondition';
import handleTime from '../../../utils/handleTime';
import { Link } from 'react-router-dom';

function Notify({ notify }) {
    return (
        <RenderWithCondition condition={notify}>
            <Link className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100' to={`${notify?.link}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '40px 20px',
                    borderRadius: '10px',
                    opacity: notify?.isRead ? 0.5 : 1,
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        cursor: 'pointer',
                    },

                }}
                onClick={() => {

                }}
        
            >
                <Box
                    sx={{
                        height: 40,
                        width: 40,
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                    }}
                >
                    <RenderWithCondition condition={notify?.sender_id === 'system'}>
                        <img src={logo} style={{ height: 40, width: 40 }} alt='system-image' />
                    </RenderWithCondition>
                    <RenderWithCondition condition={notify?.sender_id !== 'system'}>
                        <img src={notify?.notify_sender_account?.avatar} style={{ height: 40, width: 40 }} alt='system-image' />
                    </RenderWithCondition>
                </Box>
                <Box
                    display='flex'
                    flexDirection='column'
                >
                    <Paragraph bold={600} size={17}>
                        {notify?.title} - {handleTime(notify?.createdAt)}
                    </Paragraph>
                    <p bold={600} size={17} style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        maxWidth: '300px'
                    }}>
                        {notify?.content}
                    </p>
                </Box>
                <Box>

                </Box>
            </Link>
        </RenderWithCondition>
    );
}

export default Notify;