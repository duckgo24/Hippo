
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../providers/socket.provider';
import { fetchDeleteNotify, fetchGetAllNotify } from '../../redux/slice/notify.slice';
import { fetchGetAllComments } from '../../redux/slice/comment.slice';


function NotificationListener({ userId }) {
    const { my_account } = useSelector(state => state.account);
    const {notifies } = useSelector(state => state.notify);
    const socket = useSocket();
    const dispatch = useDispatch();

    useEffect(() => {
        socket.emit('join-room-userId', userId);
        return () => {
            socket.off('join-room-userId');
        };

    }, []);

    useEffect(() => {
        socket.on('receive-notify', async (response) => {
            const notifyData = response.data;
            if(notifyData) {
               await dispatch(fetchGetAllNotify({
                    acc_id: my_account?.id
                }));

                // if(notifyData.type === 'comment') {
                //     dispatch(fetchGetAllComments({
                //         post_id: notifyData.post_id,
                //         // video_id: notifyData.video_id,
                //         acc_id: my_account?.id
                //     }));
                // }
            }
        });
        return () => {
            socket.off('receive-notify');
        };
    }, [socket]);

    return null;


}

export default NotificationListener;
