import axiosJWT from "../../utils/axiosJwtInstance";


async function getFriendWithLimitByAccId(acc_id, limit) {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/friend/get-all-friend`, {
            params: {
                acc_id,
                limit
            }
        });
        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
}

async function checkIsFriend(acc_id, friend_id) {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/friend/check-friend`, {
            params: {
                acc_id,
                friend_id
            }
        });
        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
}

async function createFriend(acc_id, friend_id) {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/friend/add-friend`, {
            acc_id,
            friend_id,
            status: 'friend'
        });
        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
};

async function deleteFriend(acc_id, friend_id) {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/friend/delete-friend`, {
            params: {
                acc_id,
                friend_id
            }
        });
        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
}

export const friendService = {
    getFriendWithLimitByAccId,
    checkIsFriend,
    createFriend,
    deleteFriend
}