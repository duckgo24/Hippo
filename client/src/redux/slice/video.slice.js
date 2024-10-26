import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosJWT from "../../utils/axiosJwtInstance";
import delay from '../../utils/delay';


const fetchGetAllVideos = createAsyncThunk('videos/get-videos', async (data, { rejectWithValue, dispatch }) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/videos/get-videos`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchCreateVideo = createAsyncThunk('videos/create', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(1000);
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/videos/create`, data);
        return res.data;
    } catch (error) {
        rejectWithValue(error)
    } finally {
        dispatch(resetStatusIdle());
    }
});


const fetchUpdateVideo = createAsyncThunk('videos/update', async (data, { rejectWithValue, dispatch }) => {
    try {
        const { id: video_id } = data;
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/videos/update/${video_id}`, data);
        return res.data;
    } catch (error) {
        rejectWithValue(error)
    } finally {
        dispatch(resetStatusIdle());
    }
});



const resetStatusIdle = createAsyncThunk('videos/reset-status', async (_, { }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});


const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videos: [],
        status_video: 'idle'
    },
    extraReducers: builder =>
        builder
            //
            .addCase(fetchGetAllVideos.pending, state => {
                state.status_video = 'loading';
            })
            .addCase(fetchGetAllVideos.fulfilled, (state, action) => {
                state.videos = action.payload;
            })
            .addCase(fetchGetAllVideos.rejected, state => {
                state.status_video = 'failed';
            })

            //
            .addCase(fetchCreateVideo.pending, state => {
                state.status_video = 'loading';
            })
            .addCase(fetchCreateVideo.fulfilled, (state, action) => {
                state.status_video = 'succeeded';
                state.videos.unshift(action.payload);
            })
            .addCase(fetchCreateVideo.rejected, state => {
                state.status_video = 'failed';
            })

             //Sửa bài viết
             .addCase(fetchUpdateVideo.pending, state => {
                state.status_video = 'loading';
            })
            .addCase(fetchUpdateVideo.fulfilled, (state, action) => {
                const updateVideo = action.payload;
                state.videos = state.videos.map(video =>
                    video.id === updateVideo.id ? { ...video, ...updateVideo } : video
                );
                state.status_video = 'succeeded';

            })
            .addCase(fetchUpdateVideo.rejected, state => {
                state.status_video = 'failed';
            })

            //
            .addCase(resetStatusIdle.fulfilled, state => {
                state.status_video = 'idle';
            })

});

export default videoSlice.reducer;

export {
    fetchCreateVideo,
    fetchGetAllVideos,
    fetchUpdateVideo,
}
