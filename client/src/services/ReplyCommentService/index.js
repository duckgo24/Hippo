import axiosJWT from "../../utils/axiosJwtInstance";
import delay from "../../utils/delay";


async function getReplyCommnentByCommentId(comment_id) {
    await delay(1000);
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/${comment_id}/get-replies-comment`)
    return res.data
}


async function createReplyComment(data) {
    await delay(1000);
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/create-reply-comment`, data);
    return res.data;
}

async function deleteReplyComment(reply_comment_id) {
    await delay(1000);
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/delele-reply-comment/${reply_comment_id}`);
    return res.data;
}

export const replyCommentService = {
    getReplyCommnentByCommentId,
    createReplyComment,
    deleteReplyComment
};