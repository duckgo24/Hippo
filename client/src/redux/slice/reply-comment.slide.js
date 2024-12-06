import { createSlice } from "@reduxjs/toolkit";


const replyCommentSlice = createSlice({
    name: 'replyComment',
    initialState: {
        replyComments: [],
        status_reply: 'idle'
    },
    reducers: {
        setReplyComments: (state, action) => {
            state.replyComments = action.payload;
        },
        setCreateReplyComment: (state, action) => {
            state.replyComments.unshift(action.payload);
        },
        setDeleteReplyComment: (state, action) => {
            state.replyComments = state.replyComments.filter(item => item.reply_id !== action.payload.reply_id);
        }
    },


});


export const {
    setReplyComments,
    setCreateReplyComment,
    setDeleteReplyComment
} = replyCommentSlice.actions;

export default replyCommentSlice.reducer;

