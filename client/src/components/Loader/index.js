

import classNames from 'classnames/bind';
import styles from './Loader.module.scss';

const cx = classNames.bind(styles);

function Loader({style}) {
    return ( 
        <div style={style}>
            <div className={cx('loader')} ></div>
        </div>
     );
}

export default Loader;