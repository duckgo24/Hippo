import { Box } from "@mui/material";
import { useSocket } from "../../../providers/socket.provider";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import {BellIcon, CloseIcon} from "../../SgvIcon";
import Paragraph from "../../Paragraph";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles)
function Footer() {
    const [message, setMessage] = useState(null);
    const socket = useSocket();

    // useEffect(() => {
    //     socket.on('receive-notify', (message) => {
    //         setMessage(message);
    //     });
    //     return () => {
    //         socket.off('receive-notify');
    //     }
    // }, [socket]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setMessage(null);
    //     }, 3000);
    //     return () => clearTimeout(timer);
    // })
    return (
        <Box className={cx('footer')} position='fixed' bottom="10px" right="0" height='100px' width="100%">
            {/* <div className={cx('footer__notify')}>
                <BellIcon size={40} />
                <Box flex={1}>
                    <Paragraph>Notification</Paragraph>
                    <p>{message?.data?.message} Đây là thông báo</p>
                </Box>
                <button className={cx('footer__notify-btn-close')}>
                    <CloseIcon />
                </button>
            </div> */}
        </Box>
    );
}

export default Footer;