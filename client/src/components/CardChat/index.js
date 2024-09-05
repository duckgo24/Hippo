import { Avatar, Box } from "@mui/material";
import Paragraph from "../Paragraph";

import HandleTime from "../../utils/handleTime"


import Styles from "./CardChat.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);

function CardChat({ account, lastMessage, selected, className }) {

    const classes = cx('card-chat', {
        selected: selected,
        [className]: className,
    })

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="10px"
            padding="4px 10px"
            className={classes}
            borderRadius="10px"
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
                <Box
                    display="flex"
                    gap="10px"
                    flexDirection="row"
                    flexWrap="nowrap"
                >
                    <Paragraph>{lastMessage?.message}</Paragraph>
                    <Paragraph> • {HandleTime(lastMessage?.time)}</Paragraph>
                </Box>
            </Box>

        </Box>
    );
}

export default CardChat;