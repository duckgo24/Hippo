import { AlertTitle, Alert as MyAlert } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./Alert.module.scss"

const cx = classNames.bind(styles)

function Alert({ type, title, message }) {
    return (

        <MyAlert className={cx('alert')} severity={type}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </MyAlert>

    );
}

export default Alert;

