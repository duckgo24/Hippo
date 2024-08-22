import classNames from "classnames/bind";
import styles from "./Loading.module.scss"

const cx = classNames.bind(styles);

function Loading() {
    return ( 
        <div className={cx('loading')}>
            <div className={cx('line')}></div>
            <div className={cx('line')}></div>
            <div className={cx('line')}></div>
        </div>
     );
}

export default Loading;