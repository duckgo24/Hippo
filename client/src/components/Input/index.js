
import React from 'react'
import classNames from 'classnames/bind';
import { Box } from '@mui/material';
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

function Input({ leftIcon, rightIcon, placeholder, value, onChange, classNames, style, ...props }) {


    const classes = cx('input', {
        [classNames]: classNames,
    });

    return (
        <Box position="relative">
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            <input
                style={style}
                className={classes}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
           {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}

        </Box>
    )
}

export default Input; 
