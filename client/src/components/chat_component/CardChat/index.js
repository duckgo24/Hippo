import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";

import Paragraph from "../../Paragraph";
import HandleTime from "../../../utils/handleTime";

import Styles from "./CardChat.module.scss"
const cx = classNames.bind(Styles);

function CardChat({ account, lastMessage, room_id, selected, hasNewMessage, className, onClick }) {

    const { my_account } = useSelector(state => state.account);
    const classes = cx('card-chat', {
        selected: selected,
        [className]: className,
    })


    return (
        <Box
            className={classes}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 10px',
                borderRadius: '10px',
                '&:hover': {
                    backgroundColor: '#f1f1f1',
                    cursor: 'pointer'
                }
            }}
            onClick={onClick}
        >
            <Box
                position="relative"
            >
                <Avatar src={account?.avatar} alt={account?.avatar} />
                <div className={cx({ online: account?.status === 'online' })}></div>
            </Box>
            <Box
                flex={1}
            >
                <Paragraph bold="700">{account?.full_name}</Paragraph>
                {lastMessage &&
                    <Box
                        display="flex"
                        gap="10px"
                        flexDirection="row"
                        flexWrap="nowrap"
                    >
                        
                        {
                            lastMessage?.sender?.id === my_account?.id && lastMessage?.room_id === room_id
                                ?
                                <>
                                    <Paragraph>Bạn: {lastMessage?.content}</Paragraph>
                                    <Paragraph> • {HandleTime(lastMessage?.created_at)}</Paragraph>
                                </>
                                :
                                <>
                                    <Paragraph bold={"700"}>{lastMessage?.content}</Paragraph>
                                    <Paragraph> • {HandleTime(lastMessage?.created_at)}</Paragraph>
                                </>
                        }

                    </Box>
                }
            </Box>

        </Box>
    );
}

export default CardChat;