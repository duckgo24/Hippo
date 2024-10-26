import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosJWT from "../../utils/axiosJwtInstance";
import axios from 'axios';


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchGetAllPosts = createAsyncThunk('posts/get-posts', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/posts/get-posts`);
        dispatch(resetStatusIdle());
        return res.data;
    } catch (error) {
        dispatch(resetStatusIdle());
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

const fetchGetMyPosts = createAsyncThunk('posts/my-posts', async (data, { rejectWithValue, dispatch }) => {
    try {
        const { acc_id } = data;
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/posts/my-posts/${acc_id}`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle());
    }
});


const fetchCreatePost = createAsyncThunk('posts/create', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(1000);
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/posts/create`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    } finally {
        dispatch(resetStatusIdle());
    }
});



const fetchUpdatePost = createAsyncThunk('posts/update', async (data, { rejectWithValue, dispatch }) => {
    try {
        const { id } = data;
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/posts/update/${id}`, data);

        return res.data;
    } catch (error) {
        rejectWithValue(error)
    } finally {
        dispatch(resetStatusIdle());
    }
});


const resetStatusIdle = createAsyncThunk('post/resetStatus', async (_, { }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});


const postSlice = createSlice({
    name: 'post',
    initialState: {
        filter_posts: [],
        posts: [],
        status_post: 'idle'
    },
    extraReducers: builder =>
        builder
            //Lấy tất cả bài viết
            .addCase(fetchGetAllPosts.pending, state => {
                state.status_post = 'loading';
            })
            .addCase(fetchGetAllPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(fetchGetAllPosts.rejected, state => {
                state.status_post = 'failed';
            })

            //Lấy tất cả bài viết của tôi
            .addCase(fetchGetMyPosts.pending, state => {
                state.status_post = 'loading';
            })
            .addCase(fetchGetMyPosts.fulfilled, (state, action) => {
                state.filter_posts = action.payload;
            })
            .addCase(fetchGetMyPosts.rejected, state => {
                state.status_post = 'failed';
            })


            //Tạo bài viết
            .addCase(fetchCreatePost.pending, state => {
                state.status_post = 'loading';
            })
            .addCase(fetchCreatePost.fulfilled, (state, action) => {
                state.status_post = 'succeeded';
                state.posts.unshift(action.payload);
            })
            .addCase(fetchCreatePost.rejected, state => {
                state.status_post = 'failed';
            })

            //Sửa bài viết
            .addCase(fetchUpdatePost.pending, state => {
                state.status_post = 'loading';
            })
            .addCase(fetchUpdatePost.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                state.posts = state.posts.map(post =>
                    post.id === updatedPost.id ? { ...post, ...updatedPost } : post
                );

            })
            .addCase(fetchUpdatePost.rejected, state => {
                state.status_post = 'failed';
            })

            //
            .addCase(resetStatusIdle.fulfilled, state => {
                state.status_post = 'idle';
            })

});

export default postSlice.reducer;

export {
    fetchGetAllPosts,
    fetchGetMyPosts, 
    fetchCreatePost,
    fetchUpdatePost
}
