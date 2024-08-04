import { AlertTitle, Alert as MyAlert } from "@mui/material";

import './Alert.css';

function Alert({ type, title, message }) {
    return (
        <MyAlert style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            transition: "opacity 1s ease-in-out",
            animation: "faded 3s linear",
            minWidth: '270px',
            textAlign: 'start'
        }} severity={type}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </MyAlert>
    );
}

export default Alert;

