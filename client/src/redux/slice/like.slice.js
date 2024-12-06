import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";
import axios from "axios";


const fetchGetAllPostsLiked = createAsyncThunk('/like/posts-like', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/posts-liked`, {
            params: data
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
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/dislike`, {
            params: data
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});



const likeSlice = createSlice({
    name: 'like',
    initialState: {
        likes_post: [],
        like_videos: [],
    },
    reducers: {
        setLikesPost: (state, action) => {
            state.likes_post = action.payload;
        },
        setLikePost: (state, action) => {
            console.log(action.payload);
            
            state.likes_post.unshift(action.payload);

        },
        setDisLikePost: (state, action) => {
            const index = state.likes_post.findIndex(like => like?.id === action.payload?.id);
            if (index !== -1) {
                state.likes_post.splice(index, 1);
            }
        },

        setLikesVideo: (state, action) => {
            state.like_videos = action;
        },
        setLikeVideo: (state, action) => {
            state.like_videos.push(action.payload);
        },
        setDisLikeVideo: (state, action) => {
            const index = state.like_videos.findIndex(like => like.id === action.payload.id);
            if (index !== -1) {
                state.like_videos.splice(index, 1);
            }
        }

    }
});

export const {
    setLikesPost, setLikePost, setDisLikePost,
    setLikesVideo, setLikeVideo, setDisLikeVideo
} = likeSlice.actions;

export default likeSlice.reducer;
