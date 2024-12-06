import axiosJWT from "../../utils/axiosJwtInstance";

async function getLikesByPostId(post_id) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/post_id=${post_id}/get-all-like`);
    return res.data;
}

async function getLikesByVideoId(video_id) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/video_id=${video_id}/get-all-like`);
    return res.data;
}

async function like(data) {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/like`, data);
    return res.data;
}

async function disLike({
    post_id,
    acc_id
}) {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/dislike`, {
        data: {
            post_id,
            acc_id
        }
    });
    return res.data;
}

export const likeService = {
    getLikesByPostId,
    getLikesByVideoId,
    like,
    disLike
}