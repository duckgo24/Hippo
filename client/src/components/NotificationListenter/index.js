import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../providers/socket.provider';
import { fetchDeleteNotify, fetchGetAllNotify } from '../../redux/slice/notify.slice';
function NotificationListener({ userId }) {
    const { my_account } = useSelector(state => state.account);
    const { notifies } = useSelector(state => state.notify);
    const socket = useSocket();
    const dispatch = useDispatch();

    useEffect(() => {
        socket.emit('join-room-userId', userId);
        return () => {
            socket.off('join-room-userId');
        };
    }, [socket, userId]);

    const notifyType = {
        like: 'like',
        dislike: 'dislike',
        comment: 'comment',
        del_comment: 'del-comment',
        reply_comment: 'reply-comment',
        del_reply_comment: 'del-reply-comment',
        create_post: 'create-post',
        del_post: 'del-post',
        send_request_friend: 'send-request-friend',
        accept_request_friend: 'accept-request-friend',
        refuse_request_friend: 'refuse-request-friend',
        del_friend: 'del-friend',
    };

    useEffect(() => {
        socket.on('receive-notify', async (response) => {
            const notifyData = response.data;

            console.log(notifyData);
            

            if (Object.values(notifyType).includes(notifyData?.type)) {
                const matchingNotifies = notifies.filter(notify =>
                    notify.content === notifyData.content &&
                    notify.sender_id === notifyData.sender_id &&
                    notify.receiver_id === notifyData.receiver_id
                );

                if (matchingNotifies.length > 0) {
                    for (const notify of matchingNotifies) {
                        dispatch(fetchDeleteNotify(notify.notify_id));
                    }
                }
            }
            dispatch(fetchGetAllNotify({ acc_id: userId }));

        });

        return () => {
            socket.off('receive-notify');
        };
    }, [socket, notifies, dispatch, notifyType]);


    return null;
}

export default NotificationListener;
