import axiosJWT from "../../utils/axiosJwtInstance";

async function getAllVideos() {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/videos/get-videos`);
    return res.data;
}

async function getVideoById(video_id) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/videos/get-by-id/${video_id}`);
    return res.data;
}

async function getVideoByAccId(acc_id) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/videos/my-videos/${acc_id}`);
    return res.data;
}

async function createVideo(data) {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/videos/create`, data);
    return res.data;
}

async function deleteVideo(video_id) {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/videos/delete/${video_id}`);
    return res.data;
}

async function updateVideo(video_id, data) {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/videos/update/${video_id}`, data);
    return res.data;
}

export const videoService = {
    getAllVideos,
    getVideoByAccId,
    getVideoById,
    createVideo,
    deleteVideo,
    updateVideo
}
