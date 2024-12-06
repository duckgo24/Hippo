import { createSlice } from '@reduxjs/toolkit';



const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videos: [],
        video: {},
        status_video: 'idle'
    },
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        setVideo: (state, action) => {
            state.video = action.payload;
        },
        setCreateVideo: (state, action) => {
            state.videos.push(action.payload);
        },
        setUpdateVideo: (state, action) => {
            state.videos = state.videos.map(video => {
                if (video.video_id === action.payload.video_id) {
                    return {
                        ...video,
                        ...action.payload
                    };
                }
                return video;
            });
            state.video = {
                ...state.video,
                ...action.payload
            }
        },
        setDeleteVideo: (state, action) => {
            state.videos = state.videos.filter(video => video.video_id !== action.payload.video_id);
        }
    },
});

export const {
    setVideos, setVideo, setCreateVideo,
    setUpdateVideo, setDeleteVideo
} = videoSlice.actions;

export default videoSlice.reducer;

