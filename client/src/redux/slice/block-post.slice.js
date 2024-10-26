import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";




const fetchBlockPost = createAsyncThunk('post/block', async (data, { rejectWithValue }) => {
    try {
        const {post_id, video_id} = data;
        let q = post_id ? `post_id=${post_id}` : `video_id=${video_id}`;
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/block/${q}`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});




const blockPostSlice = createSlice({
    name: 'blockPost',
    initialState: {
        blockPosts: [],
        error: null,
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBlockPost.pending, (state, action) => {
                state.error = null;
            })
            .addCase(fetchBlockPost.fulfilled, (state, action) => {
                state.blockPosts.push(action.payload);
            })
            .addCase(fetchBlockPost.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default blockPostSlice.reducer;

export { fetchBlockPost };