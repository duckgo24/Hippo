import React from 'react';
import { Avatar, Box } from "@mui/material";
import logo from '../../../images/logo.png';
import Paragraph from '../../Paragraph';
import RenderWithCondition from '../../RenderWithCondition';
import handleTime from '../../../utils/handleTime';
import { Link } from 'react-router-dom';

function Notify({ notify }) {
    return (
        <RenderWithCondition condition={notify}>
            <Link className='flex-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 pr-4' to={`${notify?.link}`}
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
                        <Avatar src={logo} style={{ height: 40, width: 40 }} alt='system-image' />
                    </RenderWithCondition>
                    <RenderWithCondition condition={notify?.sender_id !== 'system'}>
                        <Avatar src={notify?.notify_sender_account?.avatar} style={{ height: 40, width: 40 }} alt='system-image' />
                    </RenderWithCondition>
                </Box>
                <div className='flex flex-col flex-1'>
                    <p className='font-bold'>
                        {notify?.title} • {handleTime(notify?.createdAt)}
                    </p>
                    <p className='text-sm overflow-hidden text-ellipsis  max-w-80 pr-5'
                        size={17}
                        style={{
                            lineHeight: '17px', 
                            display: '-webkit-box',
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {notify?.content}
                    </p>

                </div>
                <Box>

                </Box>
            </Link>
        </RenderWithCondition>
    );
}

export default Notify;