
import classNames from 'classnames/bind';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import {ContentCopy, HomeIcon} from '@mui/icons-material';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

import Paragraph from '../../paragraph';

import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

function Navigation() {
    return (
        <Paper sx={{ width: 320, maxWidth: '100%' , height: '100%'}}>
            <MenuList>
                <MenuItem className={cx('item')}>
                    <Paragraph
                        text='Hippo'
                        style={{
                            fontFamily: "Edu AU VIC WA NT Hand",
                            fontStyle: "italic",
                            padding: '0 0 20px 0',
                        }}
                        size={40}
                        bold={800}
                    />
                </MenuItem>
                <MenuItem className={cx('item')}>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Trang chủ</ListItemText>
                </MenuItem>
                <MenuItem className={cx('item')}>
                    <ListItemIcon>
                        <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Tìm kiếm</ListItemText>
                </MenuItem>
                <MenuItem className={cx('item')}>
                    <ListItemIcon>
                        <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Khám phá</ListItemText>
                </MenuItem>
                
                <MenuItem className={cx('item')}>
                    <ListItemIcon>
                        <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Reels</ListItemText>
                </MenuItem>
                <MenuItem className={cx('item')}>
                    <ListItemIcon>
                        <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Reels</ListItemText>
                </MenuItem>
                <MenuItem className={cx('item')}>
                    <ListItemIcon>
                        <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Reels</ListItemText>
                </MenuItem>
                <MenuItem className={cx('item')}>
                    <ListItemIcon>
                        <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Reels</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem className={cx('item')}>
                    <ListItemIcon>
                        <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Xem thêm</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}

export default Navigation;