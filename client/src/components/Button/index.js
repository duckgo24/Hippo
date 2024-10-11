import classNames from "classnames/bind";
import { Link } from "react-router-dom";



import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({ children, primary, to, href, onClick, small, medium, large, disabled, leftIcon, RightIcon, ...props }) {


    const classes = cx('button', {
        primary,
        small,
        medium,
        large,
        disabled
    })

    const _props = {
        onClick,
        disabled,
        ...props
    }

    let TagDefault = 'button';

    if (href) {
        TagDefault = 'a'
        _props.href = href;
    }

    if (to) {
        TagDefault = Link
        _props.to = to;
    }



    return (
        <TagDefault className={classes} {..._props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            {children}
            {RightIcon && <span className={cx('right-icon')}>{RightIcon}</span>}
        </TagDefault>
    );
}

export default Button;