import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";
import axios from "axios";


const fetchGetAllPostsLiked = createAsyncThunk('/like/posts-like', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/posts-liked`, {
            params : data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);

    }
});

const fetchLikePost = createAsyncThunk('like/fetchLikePost', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/like`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

const fetchDislikesPost = createAsyncThunk('/like/dislike', async (data, { rejectWithValue }) => {
    console.log(data);

    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/dislike`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});



const likeReducer = createSlice({
    name: 'like',
    initialState: {
        likePosts: [],
        likeVideos: [],
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGetAllPostsLiked.fulfilled, (state, action) => {
                state.likePosts = action.payload;
            })
            
            .addCase(fetchLikePost.fulfilled, (state, action) => {
                if (action.payload.post_id) {
                    state.likePosts.push(action.payload);
                } else {
                    state.likeVideos.push(action.payload);
                }
            })

            .addCase(fetchDislikesPost.fulfilled, (state, action) => {
                if (action.payload.post_id) {
                    const index = state.likePosts.findIndex(post => post.id === action.payload.id);
                    if (index !== -1) {
                        state.likePosts.splice(index, 1);
                    }
                } else {
                    const index = state.likeVideos.findIndex(video => video.id === action.payload.id);
                    if (index !== -1) {
                        state.likeVideos.splice(index, 1);
                    }
                }
            })
    },
});

export default likeReducer.reducer;

export { fetchGetAllPostsLiked, fetchLikePost, fetchDislikesPost };