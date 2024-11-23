import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosJWT from "../../utils/axiosJwtInstance";
import delay from "../../utils/delay";
import { useSelector } from "react-redux";
import axios from "axios";

;

const fetchGetAllComments = createAsyncThunk('comment/get-comments', async (data, { rejectWithValue, dispatch }) => {
    try {
        const { post_id, video_id, acc_id } = data;
        console.log(acc_id);

        let params = post_id ? { post_id } : { video_id };

        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/get-all-comment`, {
            params: {
                ...params,
                acc_id
            }
        });
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle)
    }
});

const fetchCreateComment = createAsyncThunk('comment/create', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(2000);
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/create-comment`, data);
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle)
    }
});

const fetchDeleteComment = createAsyncThunk('comment/delete', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(2000);
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/delete-comment`, {
            params: data
        });
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle)
    }
});

const fetchUpdateComment = createAsyncThunk('comment/update', async (data, { rejectWithValue, dispatch }) => {
    try {
        await delay(2000);
        const { comment_id } = data;
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/${comment_id}/update-comment`, data);
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    } finally {
        dispatch(resetStatusIdle)
    }
});

const resetStatusIdle = createAsyncThunk('/resetStatus', async (_) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
});


const commentSlice = createSlice({
    "name": "comment",
    initialState: {
        comments: [],
        status_comment: "idle"
    },
    reducers: {
        setSortCommentIncreaseDay: (state, payload) => {
            state.comments = state.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        },
        setSortCommentDecreaseDay: (state, payload) => {
            state.comments = state.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        }
    },
    extraReducers: builder => {
        builder
            
            .addCase(fetchGetAllComments.pending, state => {
                state.status_comment = "loading";
            })
            .addCase(fetchGetAllComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.status_comment = "succeeded";
            })
            .addCase(fetchGetAllComments.rejected, state => {
                state.status_comment = "failed";
                state.comments = [];
            })

            //Tạo comment
            .addCase(fetchCreateComment.pending, state => {
                state.status_comment = "loading";
            })
            .addCase(fetchCreateComment.fulfilled, (state, action) => {
                state?.comments?.unshift(action.payload);
                state.status_comment = "succeeded";
            })
            .addCase(fetchCreateComment.rejected, state => {
                state.status_comment = "failed";
            })
            //Xóa comment
            .addCase(fetchDeleteComment.pending, state => {
                state.status_comment = "loading";
            })
            .addCase(fetchDeleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment?.comment_id !== action.payload?.comment_id);
                state.status_comment = "succeeded";
            })

            //Sửa comment
            .addCase(fetchUpdateComment.pending, state => {
                state.status_comment = "loading";
            })
            .addCase(fetchUpdateComment.fulfilled, (state, action) => {
                state.comments = state.comments.map(comment => comment.id === action.payload.id ? action.payload : comment);
                state.status_comment = "succeeded";
            })
            .addCase(fetchDeleteComment.rejected, state => {
                state.status_comment = "failed";
            })



            .addCase(resetStatusIdle.fulfilled, state => {
                state.status_comment = "idle";
            })

    }
});

export const { setSortCommentIncreaseDay, setSortCommentDecreaseDay } = commentSlice.actions;
export default commentSlice.reducer;

export { fetchGetAllComments, fetchCreateComment, fetchDeleteComment, fetchUpdateComment };
