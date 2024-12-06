import { createSlice } from "@reduxjs/toolkit";
import delay from "../../utils/delay";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        my_comment: null,
        comments: [],
    },
    reducers: {
        setSortCommentIncreaseDay: (state, payload) => {
            state.comments = state.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        },
        setSortCommentDecreaseDay: (state, payload) => {
            state.comments = state.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        },
        setComment: (state, action) => {
            state.comments = action.payload;
        },
        setCreateComment: (state, action) => {
            state.comments.unshift(action.payload);
        },
        setUpdateComment: (state, action) => {
            state.comments = state.comments.map(comment => {
                if (comment.comment_id === action.payload.comment_id) {
                    return {
                        ...comment,
                        ...action.payload
                    };
                }
                return comment;
            });
        },
        setDeleteComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.comment_id !== action.payload.comment_id);
        },
    }
});

export const {
    setSortCommentIncreaseDay, setSortCommentDecreaseDay, setComment,
    setCreateComment, setDeleteComment, setUpdateComment

} = commentSlice.actions;

export default commentSlice.reducer;
