import axiosJWT from "../../utils/axiosJwtInstance";

async function getNotifies({
    acc_id,
}) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/notify/get-all-notify`, {
        params: {
            acc_id
        }
    });
    return res.data;
}

async function createNotify(data) {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/notify/create-notify`, data);
    return res.data;
}

async function deleteNotifyById({
    notify_id
}) {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/notify/del-notify/${notify_id}`);
    return res.data;
}

async function deleteNotify2(data) {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/notify/del-notify-2`, {
        data
    });
    return res.data;
}


export const notifyService = {
    getNotifies,
    createNotify,
    deleteNotifyById,
    deleteNotify2
}