import axiosJWT from "../../utils/axiosJwtInstance";
import delay from "../../utils/delay";


async function getCommentByPostId(post_id) {
    await delay(1000);
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/get-all-comment`, {
        params: {
            post_id
        }
    });
    return res.data;
}

async function getCommentByVideoId(video_id) {
    await delay(1000);
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/get-all-comment`, {
        params: {
            video_id
        }
    });
    return res.data;
}

async function createComment(data) {
    await delay(1000);
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/create-comment`, data);
    return res.data;
}

async function updateComment(comment_id, data) {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/update-comment/${comment_id}`, data);
    return res.data;
}

async function deleteComment(comment_id) {
    await delay(1000);
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/delete-comment/${comment_id}`);
    return res.data;
}

export const commentService = {
    getCommentByPostId,
    getCommentByVideoId,
    createComment,
    updateComment,
    deleteComment
}