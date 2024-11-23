import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import delay from "../../utils/delay";
import axiosJWT from "../../utils/axiosJwtInstance";




const fetchGetAllReplyComment = createAsyncThunk('reply/getAllReplyComment', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(2000);
        const { comment_id } = data;
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/${comment_id}/get-replies-comment`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    } finally {
        dispatch(resetStatusIdle());
    }
});


const fetchCreateReplyComment = createAsyncThunk('reply/create-reply-comment', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(2000);
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/create-reply-comment`, data);
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const fetchDeleteReplyComment = createAsyncThunk('reply/delete-reply-comment', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(2000);
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/delele-reply-comment`, {
            params: data
        });
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle());
    }
});

const resetStatusIdle = createAsyncThunk('reply/resetStatus', async(_, {}) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});

const replyCommentSlice = createSlice({
    name: 'replyComment',
    initialState: {
        replyComments: [],
        status_reply: 'idle'
    },
    reducers: {
        clearReplyComment: (state) => {
            state.replyComments = [];
        }
    },

    extraReducers: builder =>
        builder
            // 
            .addCase(fetchGetAllReplyComment.pending, (state) => {
                state.status_reply = 'loading';
            })
            .addCase(fetchGetAllReplyComment.fulfilled, (state, action) => {
                state.replyComments = action.payload;
                state.status_reply = 'succeeded';
            })
            .addCase(fetchGetAllReplyComment.rejected, (state) => {
                state.status_reply = 'failed';
                state.replyComments = [];
            })

            //
            .addCase(fetchCreateReplyComment.pending, (state) => {
                state.status_reply = 'loading';
            })
            .addCase(fetchCreateReplyComment.fulfilled, (state, action) => {
                state.replyComments.push(action.payload);
                state.status_reply = 'succeeded';
            })
            .addCase(fetchCreateReplyComment.rejected, (state) => {
                state.status_reply = 'failed';
            })

            //
            .addCase(fetchDeleteReplyComment.pending, (state) => {
                state.status_reply = 'loading';
            })
            .addCase(fetchDeleteReplyComment.fulfilled, (state, action) => {
                state.replyComments = state.replyComments.filter(item => item.reply_id !== action.payload.reply_id);
                state.status_reply = 'succeeded';
            })
            .addCase(fetchDeleteReplyComment.rejected, (state) => {
                state.status_reply = 'failed';
            })

            .addCase(resetStatusIdle.fulfilled, (state) => {
                state.status_reply = 'idle';
            })

})

export default replyCommentSlice.reducer;
export const { clearReplyComment } = replyCommentSlice.actions;

export { fetchGetAllReplyComment, fetchCreateReplyComment,fetchDeleteReplyComment };