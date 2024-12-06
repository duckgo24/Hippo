
import axiosJWT from "../../utils/axiosJwtInstance";

async function checkRequestFriendByRoleSender(sender_id, receiver_id) {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/request-friends/find-with-sender`, {
            params: {
                sender_id,
                receiver_id
            }
        });
        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
};

async function checkRequestFriendByRoleReceiver(sender_id, receiver_id) {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/request-friends/find-with-receiver`, {
            params: {
                sender_id,
                receiver_id
            }
        });
        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
}


async function createRequestAddFriend(sender_id, receiver_id) {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/request-friends/create`, {
            sender_id,
            receiver_id
        });

        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
}

async function deleteRequestFriend(sender_id, receiver_id) {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/request-friends/delete`, {
            params: {
                sender_id,
                receiver_id
            }
        });
        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
}


export const requestFriendService = {
    checkRequestFriendByRoleSender,
    checkRequestFriendByRoleReceiver,
    createRequestAddFriend,
    deleteRequestFriend,
};