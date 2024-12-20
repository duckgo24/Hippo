import axiosJWT from "../../utils/axiosJwtInstance";


async function updateMessage(message_id,data) {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/messages/${message_id}/update`, data);
    return res.data;
}

async function deleteMessage(message_id) {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/messages/${message_id}/delete`);
    return res.data;
}

export const messageService = {
    updateMessage,
    deleteMessage
}