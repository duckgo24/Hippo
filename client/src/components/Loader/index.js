import classNames from 'classnames/bind';
import styles from './Loader.module.scss';

const cx = classNames.bind(styles);

function Loader({ style, size, className }) {
  return (
    <div style={style} className={className}>
      <div
        className={cx('loader')}
        style={{
          '--loader-size': `${size}px`,
        }}
      ></div>
    </div>
  );
}

export default Loader;