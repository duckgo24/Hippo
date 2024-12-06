import axiosJWT from "../../utils/axiosJwtInstance";
import delay from "../../utils/delay";

async function GetRoom(acc_id) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/rooms/get-room/${acc_id}`);
    return res.data;
}

async function getMessages(room_id) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/messages/${room_id}/get-messages`);
    return res.data;
}

async function createMessage(data) {
    await delay(2000);
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/messages/create`, data);
    return res.data;
}


async function deleteMessage(message_id) {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/messages/delete`, { message_id });
    return res.data;
}

export const ChatService = {
    GetRoom,
    getMessages,
    createMessage,
    deleteMessage
}


