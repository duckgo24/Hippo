import axiosJWT from '../../utils/axiosJwtInstance';
import delay from '../../utils/delay';

async function getAllPosts() {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/posts/get-posts`);
    return res.data;
}

async function getPostWithPagination(page, limit) {
    await delay(1000);
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/posts/get-post-pagination-2`, {
        params: {
            page,
            limit,
        },
    });
    return res.data;
}

async function getPostByAccId(acc_id) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/posts/my-posts/${acc_id}`);
    return res.data;
}

async function getPostById(post_id) {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/posts/get-by-id/${post_id}`);
    return res.data;
}

async function createPost(data) {
    await delay(1000);
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/posts/create`, data);
    return res.data;
}

async function deletePost(post_id) {
    await delay(2000);
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/posts/delete/${post_id}`);
    return res.data;
}

async function updatePost(post_id, data) {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/posts/update/${post_id}`, data);
    return res.data;
}

export const postService = {
    getAllPosts,
    getPostWithPagination,
    getPostByAccId,
    getPostById,
    createPost,
    deletePost,
    updatePost,
};
