
import classNames from 'classnames/bind';
import styles from './GlobalStyle.module.scss';
const cx = classNames.bind(styles);
function GlobalStyle({children}) {
    return (
        <div className={cx('global-style')}>
            {children}
        </div>
    );
}

export default GlobalStyle;