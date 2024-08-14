import { Box } from "@mui/material";
import { HealIcon, MessageIcon } from "../SgvIcon";


import styles from './Reel.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);


function Reel({image, likes, comments, onClick}) {


    return ( 
        <div className={cx('reel-container')} >
            <img src={image} alt="image" width="280px" height="280px" onClick={onClick} />
            <div className={cx('reel-info')}>
                <span className={cx('new-interact')}>
                    <HealIcon size={25} style={{
                        stroke: "#fff"
                    }} />
                    {likes}
                </span>
                <span className={cx('reel-interact')}>
                    <MessageIcon size={25}  />
                    {comments}
                </span>
            </div>
            <div className={cx('over-lay')}></div>
        </div>
     );
}

export default Reel;